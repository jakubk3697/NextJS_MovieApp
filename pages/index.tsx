import { Movies } from "@/types";

export default function Home({movies}:{movies: Movies}) {
  return (
    <>
      <h1>Home Page</h1>
      <ul>
        {movies.results.map(movie => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
          </li>
        ))}
      </ul>
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