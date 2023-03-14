import { Movies } from '@/types';
import axios from 'axios';

interface propsContext {
   params: { movieType: string };
}

export default function MainMovies({movies}:{movies: Movies})  {
    return(
        <>
            <h1>Home Page</h1>

            <ul>
                {movies.results.map(movie => (
                    <li key={movie.id}>
                        <h2>{movie.title}</h2>
                    </li>
                    
                ))}
            </ul>
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
        revalidate: 60 * 60 * 24, 
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

