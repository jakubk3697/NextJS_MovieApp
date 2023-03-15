import { Movies } from '@/types';
import { MovieCard } from '@/components/MovieCard'; 
import { reactQueryFetchMovies, fetchMovies } from '@/API/moviedbAPI';
import { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useRouter } from 'next/router';

interface propsContext {
   params: { movieType: string };
}

export default function MoviesPage({movies}:{movies: Movies})  {
    const router = useRouter();
    const { movieType } = router.query;

    const initMoviedbFetch = async ({ pageParam = 1 }) => {
        const response = await reactQueryFetchMovies({ queryKey: ['movies', { page: pageParam, movieType }] });
        return response;
    }

    const {
        data,
        isError,
        isFetching,
        isSuccess,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery(['movies', { page: 1, movieType }], initMoviedbFetch, {
        getNextPageParam: (lastPage) => lastPage.page + 1,
    });

    const movieData = data ? data.pages.flatMap((page) => page.results) : movies;

    return(
        <>
            <section className="grid grid-cols-1 px-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {movieData.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
                ))}
            </section>
            <button
                        onClick={() => fetchNextPage()}
                        disabled={!hasNextPage || isFetchingNextPage}
                    >
                        {isFetchingNextPage
                            ? 'Loading more...'
                            : hasNextPage
                                ? 'Load More'
                                : 'Nothing more to load'}
                    </button>
        </>
    );    
}

export async function getStaticProps(context: propsContext) {
    const {movieType} = context.params;
    const movies = await fetchMovies(movieType, 1);
    
    return {
        props: {
            movies,
        },
        revalidate: 60 * 60 * 24, // check if static page needs to be regenerated every 24 hours 
    }
}

export async function getStaticPaths() {
    
    return {
        paths: [
            {params: {movieType: 'popular'}},
            {params: {movieType: 'top_rated'}},
            {params: {movieType: 'upcoming'}},
            {params: {movieType: 'now_playing'}},
        ],
        fallback: false,
    }
}

