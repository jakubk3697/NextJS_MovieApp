import MovieCards from "@/components/MovieCards";
import { Movies, Movie } from "@/types";
import { fetchMovies } from "@/API/moviedbAPI";

/**
 * 
 * @param movies 
 * @description It is initial page of the app. It fetches the first page of popular movies and displays them.
 * @returns Static page with the first page of popular movies
 */
export default function Home({movies}:{movies: Movies}) {
  return (
    <>
      <MovieCards movies={movies} />
    </>
  )
}

/**
 * @description It generates the first page of popular movies statically.
 * @description revalidate is set to 1 day so that the static page is regenerated after 1 day.
 * @returns First page of popular movies
 */
export async function getStaticProps() {
    const movies = await fetchMovies('popular', 1);
    return {
        props: {
            movies,
        }, 
        revalidate: 60 * 60 * 24, 
    }
}