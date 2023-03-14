import { Movie } from '@/types';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

export default function DetailsPage({ movie }: { movie: Movie }) {
    console.log(movie);
    
    return (
        
    )
}

export async function getStaticProps(context: any) {
    console.log(context);
    const { id } = context.params;
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`);
    const movie = res.data;

    return {
        props: { movie }
    }
}


export async function getStaticPaths() {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`);
    const movies = res.data.results;

    const ids = movies.map((movie: any) => movie.id);
    const paths = ids.map((id: number) => ({ params: { id: id.toString() } }));

    return {
        paths: paths,
        fallback: false
    }
}
