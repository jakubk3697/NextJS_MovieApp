import { MovieCard } from "@/components/MovieCard";
import { Movies, Movie } from "@/types";
import { fetchMovies } from "@/API/moviedbAPI";

export default function Home({movies}:{movies: Movies}) {
  return (
    <>
      <section className="px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {movies.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </>
  )
}

export async function getStaticProps() {
    
    const movies = await fetchMovies('popular', 1);
    
    return {
        props: {
            movies,
        }, 
        revalidate: 60 * 60 * 24, // check if static page needs to be regenerated every 24 hours
    }
}