import Image from 'next/image';
import { BsBookmarkStar } from 'react-icons/bs';
import { Movie } from '@/types';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';


/**
 * 
 * @param {object} movie - object with movie details
 * @description It generates a section with movie details like poster, title, overview, tagline, genres, runtime and release date
 * @returns {JSX.Element} - returns a section with movie details  
 */
export const MainInfo = ({ movie }: { movie: Movie }) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const { data: session, status } = useSession();
    const Router = useRouter();

    const handleAddToFavorites = async () => {
        if (status === 'unauthenticated') Router.replace('/auth/signIn');

        if (status === 'authenticated') {
            const response = await fetch('/api/post/movies/favorites', {
                method: 'POST',
                body: JSON.stringify({
                    movieId: movie.id,
                    userEmail: session?.user?.email,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response
            console.log(data);
        }

    }


    return (
        <section className="flex flex-col items-center pb-10 border-b border-gray-500 md:flex-row">
            <div className="w-full mb-4 md:w-1/3 md:mb-0">
                <Image
                    src={moviePosterUrl}
                    alt={movie.title}
                    width={500}
                    height={750}
                    className="rounded-lg"
                />
            </div>
            <div className="w-full md:w-2/3 md:pl-8">
                <h1 className="mb-2 text-3xl font-bold">{movie.title}</h1>
                <p className="mb-4 text-gray-400">
                    {movie.overview}
                </p>
                <p className="text-2xl font-thin italic text-red-700 mb-5">{movie.tagline}</p>
                <p className="mb-2 text-lg font-bold text-gray-400">
                    {movie.genres.map((genre) => genre.name).join(', ')}
                </p>
                <p className="mb-2 text-lg font-bold text-gray-400">{`${movie.runtime} min`}</p>
                <p className="mb-2 text-lg font-bold text-gray-400">{`Released on ${movie.release_date}`}</p>
                <button
                    className="flex items-center px-4 py-2 rounded-md bg-red-500 text-white"
                    onClick={handleAddToFavorites}
                >
                    <BsBookmarkStar className="h-5 w-5 mr-2" />
                    Add to Favorites
                </button>
            </div>
        </section>
    )
}