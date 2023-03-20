import { Movie, Movies } from "../types";
import { MovieCard } from "./elements/MovieCard";

/**
 * 
 * @param {Movies} movies - array of movies to render 
 * @returns {JSX.Element} - returns section with movie cards 
 * @description It renders "MovieCard"  component for each movie from the movies array
 */
export default function MovieCards({movies}: {movies: Movies}) {
    return (
        <section className="px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {movies.map((movie: Movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </section>
    )
}