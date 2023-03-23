import axios from "axios";

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const reactQueryFetchMovies = async ({ queryKey }: any) => {
    const [_key, { page, movieType }] = queryKey;

    const url = `${BASE_URL}/movie/${movieType}?api_key=${API_KEY}&page=${page}`;
    const { data } = await axios.get(url);

    return data;
};

export const fetchMovies = async (category: string = 'popular', page: number = 1) => {
    const res = await axios.get(`${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=${page}`);
    
    return res.data.results;
}

export const fetchMovieByID = async (id:number) => {
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
    const { data } = await axios.get(url);

    return data;
}

export const fetchMovieCastByID = async (id:number) => {
    const res =  await axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
    
    return res.data.cast;
}


export const fetchMovieSnapshots = async (id:number) => {
    const res = await axios.get(`${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`);

    return res.data.backdrops;
}

export const fetchMovieByTitle = async (title:string) => {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${title}`;
    const { data } = await axios.get(url);

    return data;
}

export const fetchGenres = async () => {
    const res = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);

    return res.data.genres;
}

export const fetchSimiliarMovies = async (id:number) => {
    const res = await axios.get(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`);

    return res.data.results;
}

