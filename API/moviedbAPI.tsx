import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (category: string = 'popular', page: number = 1) => {
    // https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1
    const res = await axios.get(`${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=${page}`);
    
    return res.data.results;
}

export const fetchMovieByID = async (id:number) => {
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
    const { data } = await axios.get(url);

    return data;
}

export const fetchMovieCastByID = async (id:number) => {
    const res =  await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
    
    return res.data.cast;
}