import { Movies } from "@/types"
import MovieCards from "@/components/MovieCards"

export const SimiliarMovies = ({movies}: {movies: Movies}) => {
    return (
        <section className="py-10">
            <h2 className="text-2xl font-bold mb-5">Similar Movies</h2>
            {movies?.length ? <MovieCards movies={movies} /> : <p className="text-gray-400">No similar movies found...</p>}
        </section>
    )
}

