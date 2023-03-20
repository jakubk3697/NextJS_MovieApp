import { Movies } from "@/types"
import MovieCards from "@/components/MovieCards"

/**
 * 
 * @param {Movies} movies - array of movies to render 
 * @returns {JSX.Element} - returns section with movie cards
 * @description It renders movie cards if there are any movies in array and renders a message if there are no movies in array.
 */
export const SimiliarMovies = ({movies}: {movies: Movies}) => {
    return (
        <section className="py-10">
            <h2 className="text-2xl font-bold mb-5">Similar Movies</h2>
            {movies?.length ? <MovieCards movies={movies} /> : <p className="text-gray-400">No similar movies found...</p>}
        </section>
    )
}

