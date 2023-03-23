import axios from "axios";

// Util component where we can store all the API calls to keep the code clean and readable

/**
 * @param category Category of the movie
 * @param page Argument which tells the API which page to fetch
 * @description Trigger API call to fetch movies based on category and page
 * @returns Array of movies based on category and page
 */
export const fetchMovies = async (category: string = 'popular', page: number = 1) => {
    const res = await axios.get(`/api/get/movies/${category}?page=${page}`);
    
    return res.data.results;
}

/**
 * 
 * @param id Movie ID
 * @description Trigger API call to fetch movie details based on ID 
 * @returns Details of the movie
 */
export const fetchMovieByID = async (id:number) => {
    const res = await axios.get(`/api/get/movie/${id}`);

    return res.data;
}

/**
 * 
 * @param id Movie ID
 * @description Trigger API call to fetch movie cast based on ID
 * @returns Array of cast members
 */
export const fetchMovieCastByID = async (id:number) => {
    const res = await axios.get(`/api/get/movie/${id}/cast`);

    return res.data.cast;
}

/**
 * 
 * @param id Movie ID
 * @description Trigger API call to fetch movie snapshots based on ID
 * @returns Array of snapshots
 */
export const fetchMovieSnapshots = async (id:number) => {
    const res = await axios.get(`/api/get/movie/${id}/snapshots`);

    return res.data.backdrops;
}

/**
 * 
 * @param title Title of the movie
 * @description Use the title to fetch movies based on the title
 * @returns Array of movies based on the title
 */
export const fetchMovieByTitle = async (title:string) => {
    const res = await axios.get(`/api/get/movie/search/${title}`);

    return res.data.results;
}

/**
 * @description Trigger API call to fetch all the genres. Used for translate the genre ID to genre name
 * @returns Array of genres
 */
export const fetchGenres = async () => {
    const res = await axios.get(`/api/get/movie/genres`);

    return res.data.genres;
}

/**
 * @param id Movie ID
 * @description Trigger API call to fetch similiar movies based on ID
 * @returns Array of similiar movies based on the ID
 */
export const fetchSimiliarMovies = async (id:number) => {
    const res = await axios.get(`/api/get/movie/${id}/similiarMovies`);

    return res.data.results;
}

