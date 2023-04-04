import MovieCards from "@/components/MovieCards";
import { Movies, Movie } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react"

/**
 * 
 * @param movies 
 * @description It is initial page of the app. It fetches the first page of popular movies and displays them.
 * @returns Static page with the first page of popular movies
 */
export default function Home({movies}: {movies: Movies}) {
  const { data: session } = useSession();
  console.log(session);
  
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
  const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=1`);
  
    return {
        props: {
            movies: data.results,
        }, 
        revalidate: 60 * 60 * 24,
    }
}