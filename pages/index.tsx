import MoviesView from "@/components/MoviesView";
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
      <MoviesView movies={movies} />
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