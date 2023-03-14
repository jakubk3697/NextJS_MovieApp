import { MovieCard } from "@/components/MovieCard";
import { Movies } from "@/types";

export default function Home({movies}:{movies: Movies}) {
  return (
    <>
      <div className="px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {movies.results.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  )
}

export async function getStaticProps() {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIEDB_API_KEY}&language=en-US&page=1`);
    const movies = await res.json();
    
    return {
        props: {
            movies,
        }, 
        revalidate: 60,
    }
}