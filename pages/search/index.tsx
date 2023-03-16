import { useRouter } from 'next/router';
import { fetchMoviesByTitle } from '@/API/moviedbAPI';
import { useQuery } from 'react-query';
import { MovieCard } from '@/components/MovieCard';
import { Movie } from '@/types';
import { Loader } from '@/components/elements/Loader';

function SearchPage() {
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

    if (isError) return <p>Something went wrong</p>
    
    const movies = data?.results;

    return (
        <>
            {isSuccess && (
                <section className="px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {movies.map((movie: Movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </section>
            )}
        </>
    )
}

export default SearchPage