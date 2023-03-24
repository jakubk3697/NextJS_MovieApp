import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import {fetchMovieByTitle} from '@/APIUtils/moviedbAPI';  
import { Loader } from '@/components/elements/Loader';
import MovieCards from '@/components/MovieCards';
import { Meta } from '@/components/Meta';
import {AITextToArray} from '@/utils/validation';

/**
 * @description It uses router to get query from url and then uses it to fetch movie titles from OpenAI API using React Query.
 * @description Then it uses those titles to fetch movies from MovieDB API using another React Query which waits for the first one to finish. 
 * @description Then it renders MovieCards component with fetched movies.
 * @returns returns a page with movies matched by AI
 */
export default function AIMatchPage() {
    const router = useRouter();
    const { AIquery }: any = router.query;
    
    const [isRouterReady, setIsRouterReady] = useState(false);

    const queryMovieTitlesByAI = async ({AIquery}: {AIquery: string}) => {
        const data = {
            'prompt': `
            Read and parse the value from the following INPUT, which contains information sent by the user about their movie taste, then return the six movie titles that best match that input. If you don't understand the INPUT return the random most liked movies of this year. 
            Return only the titles in the JavaScript array, nothing else is included.
            INPUT={${AIquery}}
            `,
        };

        const response = await fetch('/api/post/openai/generate-titles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), 
        });

        const movieTitles = await response.json();
        const movieTitlesArray = AITextToArray(movieTitles.text);
         
        return movieTitlesArray;
    }
    
    /**
     * 
     * @param {string} AIquery - query from url
     * @description Initial function for React Query to fetch movie titles from OpenAI API
     * @returns  {Promise<string>} - stringified array of movie titles
     */
    const initQueryMovieTitlesByAI = async ({ queryKey }: any) => {
        const [_key, { AIquery }] = queryKey;
        const titlesFromAI = await queryMovieTitlesByAI({ AIquery });
        return titlesFromAI;
    }
    
    /**
     * @description it uses movie titles from first query to fetch movies from MovieDB API and returns array of movies
     * @description it uses Promise.all to fetch all movies at once
     * @description it uses possibleMoviesObj.results[0] because MovieDB API returns array of possible movies and we want to get the first one
     * @returns array of movies as Promise
    */
    const initFetchMoviesByTitle = async ({ queryKey }: any) => {
        const [_key, { aiMovieTitles }] = queryKey;

        const movies = await Promise.all(aiMovieTitles.map(async (title: string) => {
            const moviesObj = await fetchMovieByTitle(title);
            console.log(moviesObj);
            const movie = moviesObj[0];
            return movie;
        }));

        return movies;
    }

    /**
     * @description it uses initQueryMovieTitlesByAI function to fetch movie titles from OpenAI API
     * @description it uses AIquery from url as a queryKey
     * @description it is enabled only if AIquery is not empty
     * @description staleTime is 1 hour (data treated as fresh for 1 hour to prevent refetch data on each refresh or when user navigates back to this page)
     */
    const {
        data: aiMovieTitles,
        isFetching: aiTitlesIsFetching,
        isError: aiTitlesIsError,
    } = useQuery({
        queryKey: ['aiMovieTitles', { AIquery }],
        queryFn: initQueryMovieTitlesByAI,
        enabled: !!AIquery && AIquery.length > 6,
        staleTime: 24 * 60 * 60 * 1000, // 24h cached data
    });
    

    /**
     * @description it uses initFetchMoviesByTitle function to fetch movies from MovieDB API
     * @description it uses aiMovieTitles from previous query as a queryKey
     * @description it is enabled only if aiMovieTitles is not empty
     * @description staleTime is 1 hour (data treated as fresh for 1 hour to prevent refetch data on each refresh or when user navigates back to this page)
    */
    const {
        data: aiMovies,
        isError: aiMoviesIsError,
        isSuccess: aiMoviesIsSuccess,
        isFetching: aiMoviesIsFetching,
    } = useQuery({
        queryKey: ['aiMovies', { aiMovieTitles }],
        queryFn: initFetchMoviesByTitle,
        enabled: !!aiMovieTitles,
        staleTime: 24 * 60 * 60 * 1000, // 24h cached data
    });
    
    

    /**
     * @description it waits for router to be ready and then sets isRouterReady to true
     * @description it is needed because we want to use router.query only when router is ready
     * @description if we don't do this, we will get error because router.query will be undefined
     * @description we can't use router.isReady in useQuery because it will cause infinite loop
     */
    useEffect(() => {
        if (router.isReady) {
            setIsRouterReady(true);
        }
    }, [router.isReady]);

    if (!isRouterReady) {
        return null;
    }
    
    return (
        <>
            <Meta
                title="Movies matched by AI"
                description="Movies matched by AI using OpenAI API and MovieDB API"
                keywords="AI, OpenAI, MovieDB, movies, matched, match, movie, movie match, movie matched"
            />
            <h1 className="mb-10 mx-10 text-2xl text-white md:text-3xl">Matched by AI:</h1>
            {aiTitlesIsError || aiMoviesIsError && <p className="text-gray-200 text-l">Nothing found...</p>}
            {aiMoviesIsFetching || aiTitlesIsFetching && <Loader/>}
            {aiMoviesIsSuccess && <MovieCards movies={aiMovies} />}
        </>
    )
}