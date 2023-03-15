import { Movies } from '@/types';
import { MovieCard } from '@/components/MovieCard'; 
import { fetchMovies } from '@/API/moviedbAPI';

interface propsContext {
   params: { movieType: string };
}

export default function MoviesPage({movies}:{movies: Movies})  {
    return(
        <>
            <section className="px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {movies.results.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
                ))}
            </section>
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

