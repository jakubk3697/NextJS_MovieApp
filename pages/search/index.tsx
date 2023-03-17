import { useRouter } from 'next/router';
import { fetchMoviesByTitle } from '@/API/moviedbAPI';
import { useQuery } from 'react-query';
import { Loader } from '@/components/elements/Loader';
import MovieCards from '@/components/MovieCards';


/**
 * @description It uses the query from the url to fetch the movies that match the query
 * @description It uses the useQuery hook to fetch the data client-side
 * @description It uses the MovieCard component to display the movies
 * @returns Movie Cards of the movies that match the search query from the url
 */
export default function SearchPage() {
    const router = useRouter();
    const { query }:any = router.query;

    const { data, isFetching, isError, isSuccess } = useQuery(
        ['movies', { query }],
        () => fetchMoviesByTitle(query),
        {
            enabled: !!query,
        }
    )    
    
    if (isFetching) return <Loader/>
    if (isError) return router.push('/404');
    
    const movies = data?.results;

    return (
        <>
            {isSuccess && (
                <MovieCards movies={movies} />
            )}
        </>
    )
}