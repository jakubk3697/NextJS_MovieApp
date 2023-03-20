import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useState, useEffect, useMemo } from 'react';
import { queryMovieTitlesByAI } from '@/API/openaiAPI';
import {fetchMovieByTitle} from '@/API/moviedbAPI';  
import { Loader } from '@/components/elements/Loader';
import MovieCards from '@/components/MovieCards';

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
     * @returns {Promise<Array>} - array of movies
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

    const {
        data: aiMovieTitles,
        isFetching: aiTitlesIsFetching,
        isError: aiTitlesIsError,
    } = useQuery({
        queryKey: ['aiMovieTitles', { AIquery }],
        queryFn: initQueryMovieTitlesByAI,
        enabled: !!AIquery && isRouterReady,
    });

    const {
        data: aiMovies,
        isError: aiMoviesIsError,
        isSuccess: aiMoviesIsSuccess,
        isFetching: aiMoviesIsFetching,
    } = useQuery({
        queryKey: ['aiMovies', { aiMovieTitles }],
        queryFn: initFetchMoviesByTitle,
        enabled: !!aiMovieTitles && isRouterReady,
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

    if (aiTitlesIsError || aiMoviesIsError) return router.push('/404');
    
    return (
        <>
            <h1 className="mb-10 text-2xl font-semibold text-white md:text-3xl">Movies matched by AI:</h1>
            {aiMoviesIsFetching || aiTitlesIsFetching && <Loader/>}
            {aiMoviesIsSuccess && <MovieCards movies={aiMovies} />}
        </>
    )
}