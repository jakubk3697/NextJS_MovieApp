import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useState, useEffect, useMemo } from 'react';
import { queryMovieTitlesByAI } from '@/API/openaiAPI';
import {fetchMovieByTitle} from '@/API/moviedbAPI';  
import { Loader } from '@/components/elements/Loader';
import MovieCards from '@/components/MovieCards';

export default function AIMatchPage() {
    const router = useRouter();
    const { AIquery }: any = router.query;

    const [isRouterReady, setIsRouterReady] = useState(false);

    const initQueryMovieTitlesByAI = async ({ queryKey }: any) => {
        const [_key, { AIquery }] = queryKey;
        const titlesFromAI = await queryMovieTitlesByAI({ AIquery });
        return titlesFromAI;
    }
    
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
        isError: aiIsError,
        isSuccess: aiIsSuccess,
        isFetching: aiIsFetching,
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
    

    useEffect(() => {
        if (router.isReady) {
            setIsRouterReady(true);
        }
    }, [router.isReady]);

    if (!isRouterReady) {
        return null;
    }

    if (aiIsError || aiMoviesIsError) return router.push('/404');
    
    return (
        <>
            <h1 className="mb-10 text-2xl font-semibold text-white md:text-3xl">Movies matched by AI:</h1>
            {aiMoviesIsFetching && <Loader/>}
            {aiMoviesIsSuccess && <MovieCards movies={aiMovies} />}
        </>
    )
}