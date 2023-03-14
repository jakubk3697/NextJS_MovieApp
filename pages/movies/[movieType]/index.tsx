import { Movies } from '@/types';
import axios from 'axios';
import { MovieCard } from '@/components/MovieCard'; 

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
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieType}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`);
    const movies = await res.data;

    return {
        props: {
            movies,
        },
        revalidate: 60, 
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

