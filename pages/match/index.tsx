import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { queryMovieTitlesByAI } from '@/API/openaiAPI';
import {fetchMovieByTitle} from '@/API/moviedbAPI';  
import { Loader } from '@/components/elements/Loader';
import MovieCards from '@/components/MovieCards';
import { Meta } from '@/components/Meta';



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
    
    
    /**
     * 
     * @param {string} AIquery - query from url
     * @returns  {Promise<string>} - stringified array of movie titles
     * @description Initial function for React Query to fetch movie titles from OpenAI API
     */
    const initQueryMovieTitlesByAI = async ({ queryKey }: any) => {
        const [_key, { AIquery }] = queryKey;
        const titlesFromAI = await queryMovieTitlesByAI({ AIquery });
        return titlesFromAI;
    }
    
    /**
     * @returns array of movies as Promise
     * @description it uses movie titles from first query to fetch movies from MovieDB API and returns array of movies
     * @description it uses Promise.all to fetch all movies at once
     * @description it uses possibleMoviesObj.results[0] because MovieDB API returns array of possible movies and we want to get the first one
    */
    const initFetchMoviesByTitle = async ({ queryKey }: any) => {
        const [_key, { aiMovieTitles }] = queryKey;

        const movies = await Promise.all(JSON.parse(aiMovieTitles).map(async (title: string) => {
            const possibleMoviesObj = await fetchMovieByTitle(title);
            const movie = possibleMoviesObj.results[0];
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
        staleTime: 60 * 60 * 1000, // 1 hour
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
        staleTime: 60 * 60 * 1000, // 1 hour
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