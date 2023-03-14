import { Movie } from '@/types';
import axios from 'axios';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {BsBookmarkStar} from 'react-icons/bs';

interface staticParams{
    movie: Movie;
    casts: {
        cast: object[];
        crew: object[];
    }
}

export default function MovieDetails(params: staticParams) {
    const {movie, casts} = params;
    const moviePosterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const initialActors = casts.cast.slice(0, 6); // handle how much actors to show on the page

    const generateActorPoster = (profile_path: string) => {
        return `https://image.tmdb.org/t/p/w500${profile_path}`;
    }

    return (
            <div className="container my-12 px-4">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <Image
                            src={moviePosterUrl}
                            alt={movie.title}
                            width={500}
                            height={750}
                            className="rounded-lg"
                        />
                    </div>
                    <div className="w-full md:w-2/3 md:pl-8">
                        <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                        <p className="text-gray-500 mb-4">
                           {movie.overview}
                        </p>
                        <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md">
                            <BsBookmarkStar className="h-5 w-5 mr-2" />
                            Add to Favorites
                        </button>
                    </div>
                </div>
                <div className="my-8">
                    <h2 className="text-2xl font-bold mb-4">Actors</h2>
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
                                    <p className="text-lg font-semibold my-2">{actor.name}</p>
                                    <p className="text-gray-300">{actor.character}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="my-8">
                    <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="w-full md:w-1/2 mb-4 md:mb-0">
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <p className="text-gray-500 mb-2">Posted by User1234 <span className="font-bold text-red-500">{`<--`}Here will be proper user from Database*</span></p>
                                <p className="text-lg font-semibold mb-2">Amazing Movie!</p>
                                <p className="text-gray-500">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at tortor finibus, elementum lacus vel, tempor urna. In vel augue eu quam malesuada interdum. Suspendisse potenti. Donec molestie mauris vel sapien suscipit malesuada. In hac habitasse platea dictumst. Suspendisse non leo non nulla convallis egestas. Nulla vel malesuada magna. Pellentesque aliquet erat nunc, nec tristique quam auctor id. Nunc ac vestibulum urna. Sed imperdiet, lacus in vulputate finibus, lectus sapien molestie velit, vel sagittis augue ex vitae felis. Donec quis luctus tellus. Integer nec metus tellus. Sed suscipit tellus et arcu bibendum, sit amet fermentum nisi facilisis.
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 mb-4 md:mb-0">
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <p className="text-gray-500 mb-2">Posted by User456 <span className="font-bold text-red-500">{`<--`}Here will be proper user from Database</span></p>
                                <p className="text-lg font-semibold mb-2">Not my cup of tea</p>
                                <p className="text-gray-500">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at tortor finibus, elementum lacus vel, tempor urna. In vel augue eu quam malesuada interdum. Suspendisse potenti. Donec molestie mauris vel sapien suscipit malesuada. In hac habitasse platea dictumst. Suspendisse non leo non nulla convallis egestas. Nulla vel malesuada magna. Pellentesque aliquet erat nunc, nec tristique quam auctor id. Nunc ac vestibulum urna. Sed imperdiet, lacus in vulputate finibus, lectus sapien molestie velit, vel sagittis augue ex vitae felis. Donec quis luctus tellus. Integer nec metus tellus. Sed suscipit tellus et arcu bibendum, sit amet fermentum nisi facilisis.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export async function getStaticProps(context: any) {
    const { id } = context.params;
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
    const movie = res.data;

    const res2 = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
    const casts = res2.data;

    return {
        props: {movie, casts}
    }
}


export async function getStaticPaths() {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`);
    const movies = res.data.results;

    const ids = movies.map((movie: Movie) => movie.id);
    const paths = ids.map((id: number) => ({ params: { id: id.toString() } }));

    return {
        paths: paths,
        fallback: false
    }
}
