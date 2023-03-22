import { Movies } from '@/types';
import { reactQueryFetchMovies, fetchMovies } from '@/API/moviedbAPI';
import { useInfiniteQuery } from 'react-query';
import { useRouter } from 'next/router';
import MovieCards from '@/components/MovieCards';
import { Loader } from '@/components/elements/Loader';
import { Meta } from '@/components/Meta';
import { categories } from '@/utils/categories';

interface propsContext {
    params: { movieType: string };
}

/**
 * @description It uses the movie type from the url to fetch the movies of that type.
 * @description It uses react-query to fetch the movies and infinite scroll to load more movies.
 * @description First page is generated statically and the rest is fetched using react-query.
 * @returns MoviesPage page with the movies of the selected type [popular, top_rated, upcoming, now_playing]
 */
export default function MoviesPage({ movies }: { movies: Movies }) {
    const router = useRouter();
    const { movieType } = router.query;

    /**
     * @description It is a function that is passed to the useInfiniteQuery hook to fetch the data client-side page by page beginning from the second page.
     */
    const initMoviedbFetch = async ({ pageParam = 1 }) => {
        const response = await reactQueryFetchMovies({ queryKey: ['movies', { page: pageParam, movieType }] });
        return response;
    }

    /**
     * @description It uses the useInfiniteQuery hook to fetch the data client-side page by page beginning from the second page.
     */
    const {
        data,
        isError,
        isSuccess,
        isFetching,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery(['movies', { page: 1, movieType }], initMoviedbFetch, {
        getNextPageParam: (lastPage) => lastPage.page + 1,
    });

    /**
     * @description It contains the data from the first page of the movies fetched statically and each next page fetched using react-query.
     */
    const movieData = data ? data.pages.flatMap((page) => page.results) : movies;

    /**
     * 
     * @description It is used to set the title of the page.
     * @returns The name of the category from the categoryPaths array.
     */
    const generateCurrentPageName = () => {
        const categoryPath = categories.find((category) => category.path === movieType);
        return categoryPath?.name;
    }

    /**
     * @description It finds the name of the category from the categoryPaths array.
     * @description It is used to set the title of the page.
     */
  
    if (isError) return router.push('/404');
    if (isFetching && !isFetchingNextPage) return <Loader />;
    
    return (
        <>
            {isSuccess && (
                <>
                    <Meta 
                        title={generateCurrentPageName()}
                        description={`List of ${generateCurrentPageName()} movies`}
                        keywords={`movies, video, ${generateCurrentPageName()} movies, movies library`}
                    />
                    <MovieCards movies={movieData} />
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={!hasNextPage || isFetchingNextPage}
                        className="block mx-auto mt-10 px-5 py-2 text-lg font-medium rounded-md text-white bg-sky-700 focus:outline-none focus:ring-1 focus:ring-offset-2 hover:opacity-95 disabled:opacity-50"
                    >
                        {isFetchingNextPage
                            ? 'Loading more...'
                            : hasNextPage
                                ? 'Load More'
                                : 'Nothing more to load'}
                    </button>
                </>
            )}
        </>
    );
}

/**
 * @param context It contains the movie type from the url.
 * @description It fetches the first page of the movies of the selected type. 
 * @description revalidate is set to 1 day so that the static page is regenerated after 1 day.
 * @returns Static page with the movies of the selected type [popular, top_rated, upcoming, now_playing]
 */
export async function getStaticProps(context: propsContext) {
    const { movieType } = context.params;
    const movies = await fetchMovies(movieType, 1);

    return {
        props: {
            movies,
        },
        revalidate: 60 * 60 * 24,
    }
}

/**
 * @returns It returns the paths for the static pages.
 */
export async function getStaticPaths() {
    return {
        paths: [
            { params: { movieType: 'popular' } },
            { params: { movieType: 'top_rated' } },
            { params: { movieType: 'upcoming' } },
            { params: { movieType: 'now_playing' } },
        ],
        fallback: false,
    }
}

