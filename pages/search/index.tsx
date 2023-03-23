import { useRouter } from 'next/router';
import { fetchMovieByTitle } from '@/APIUtils/moviedbAPI';
import { useQuery } from 'react-query';
import { Loader } from '@/components/elements/Loader';
import MovieCards from '@/components/MovieCards';
import { Meta } from '@/components/Meta';

/**
 * @description It uses the query from the url to fetch the movies that match the query
 * @description It uses the useQuery hook to fetch the data client-side
 * @description It uses the MovieCard component to display the movies
 * @returns Movie Cards of the movies that match the search query from the url
 */
export default function SearchPage() {
    const router = useRouter();
    const { query }:any = router.query;

    const { data: movies, isFetching, isError, isSuccess } = useQuery(
        ['movies', { query }],
        () => fetchMovieByTitle(query),
        {
            enabled: !!query,
            staleTime: 1000 * 60 * 60 * 24, // 24 hours
        }
    )    
    
    if (isFetching) return <Loader/>
    if (isError) return router.push('/404');
    
    return (
        <>
            <Meta 
                title={`Search Results for ${query}`}
                keywords={`movies, movie app, search results, ${query}`}
                description={`Search Results for ${query}`} 
            />
            <h1 className="mb-10 mx-10 text-2xl text-white md:text-3xl">Search Results:</h1>
            {isSuccess && (
                <MovieCards movies={movies} />
            )}
        </>
    )
}