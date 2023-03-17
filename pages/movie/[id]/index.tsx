import { Movie } from '@/types';
import Image from 'next/image';
import {BsBookmarkStar} from 'react-icons/bs';
import {fetchMovieByID, fetchMovieCastByID } from '@/API/moviedbAPI';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Loader } from '@/components/elements/Loader';

/**
 * @description It uses the movie id from the url to fetch the movie details. 
 * @description Two queries are used to fetch the data. One for the movie details and the other for the cast.
 * @description UseEffect is used to set the state of the router to true when the router is ready.
 * @description *Important: Both queries are enabled only when the router is ready and the id is available.
 * @returns MovieDetails page with the details of the movie and the cast of the movie
 * @todo Add a button to add the movie to the user's favorites
 * 
 */
export default function MovieDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [isRouterReady, setIsRouterReady] = useState(false);

    const { data: movie } = useQuery<Movie>(['movie', id], () => fetchMovieByID(Number(id)), {
        enabled: isRouterReady && !!id,
    });

    const { data: cast } = useQuery<object[]>(['cast', id], () => fetchMovieCastByID(Number(id)), {
        enabled: isRouterReady && !!id,
    });

    useEffect(() => {
        if (router.isReady) {
            setIsRouterReady(true);
        }
    }, [router.isReady]);
    
    const generateActorPoster = (profile_path: string) => {
        return `https://image.tmdb.org/t/p/w400${profile_path}`;
    }

    if (!isRouterReady) {
        return null;
      }
    

      if (!movie || !cast) {
        return <Loader/>
      }

    const moviePosterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const initialActors = cast.slice(0, 6); // handle how much actors to show on the page


    return (
        <>
            <div className="container my-12 px-4 bg-black bg-opacity-30">
                <div className="flex flex-col md:flex-row items-center">
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
                        <button className="flex items-center px-4 py-2 rounded-md bg-red-500 text-white">
                            <BsBookmarkStar className="h-5 w-5 mr-2" />
                            Add to Favorites
                        </button>
                    </div>
                </div>
                <div className="my-8">
                    <h2 className="mb-4 text-2xl font-bold">Actors</h2>
                    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                        {initialActors.map((actor: any) => {
                            return (
                                <div key={actor.id} className="mx-auto">
                                    <Image
                                        src={generateActorPoster(actor.profile_path)}
                                        alt={actor.name}
                                        width={200}
                                        height={225}
                                        className="rounded-md"
                                    />
                                    <p className="my-2 text-lg font-semibold">{actor.name}</p>
                                    <p className="text-gray-300">{actor.character}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="my-8">
                    <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <div className="w-full mb-4 md:w-1/2 md:mb-0">
                            <div className="p-4 bg-white rounded-lg shadow-md">
                                <p className="mb-2 text-gray-500">Posted by User1234 <span className="font-bold text-red-500">{`<--`}Here will be proper user from Database*</span></p>
                                <p className="mb-2 text-lg font-semibold">Amazing Movie!</p>
                                <p className="text-gray-500">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at tortor finibus, elementum lacus vel, tempor urna. In vel augue eu quam malesuada interdum. Suspendisse potenti. Donec molestie mauris vel sapien suscipit malesuada. In hac habitasse platea dictumst. Suspendisse non leo non nulla convallis egestas. Nulla vel malesuada magna. Pellentesque aliquet erat nunc, nec tristique quam auctor id. Nunc ac vestibulum urna. Sed imperdiet, lacus in vulputate finibus, lectus sapien molestie velit, vel sagittis augue ex vitae felis. Donec quis luctus tellus. Integer nec metus tellus. Sed suscipit tellus et arcu bibendum, sit amet fermentum nisi facilisis.
                                </p>
                            </div>
                        </div>
                        <div className="w-full mb-4 md:w-1/2 md:mb-0">
                            <div className="p-4 bg-white rounded-lg shadow-md">
                                <p className="mb-2 text-gray-500">Posted by User456 <span className="font-bold text-red-500">{`<--`}Here will be proper user from Database</span></p>
                                <p className="mb-2 text-lg font-semibold">Not my cup of tea</p>
                                <p className="text-gray-500">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at tortor finibus, elementum lacus vel, tempor urna. In vel augue eu quam malesuada interdum. Suspendisse potenti. Donec molestie mauris vel sapien suscipit malesuada. In hac habitasse platea dictumst. Suspendisse non leo non nulla convallis egestas. Nulla vel malesuada magna. Pellentesque aliquet erat nunc, nec tristique quam auctor id. Nunc ac vestibulum urna. Sed imperdiet, lacus in vulputate finibus, lectus sapien molestie velit, vel sagittis augue ex vitae felis. Donec quis luctus tellus. Integer nec metus tellus. Sed suscipit tellus et arcu bibendum, sit amet fermentum nisi facilisis.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
