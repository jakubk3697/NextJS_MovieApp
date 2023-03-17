import { Movie } from '@/types';
import Image from 'next/image';
import { BsBookmarkStar } from 'react-icons/bs';
import { fetchMovieByID, fetchMovieCastByID } from '@/API/moviedbAPI';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Loader } from '@/components/elements/Loader';
import noPoster from '@/public/no_card_poster.png'

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

    if (!isRouterReady) {
        return null;
    }

    if (!movie || !cast) {
        return <Loader />
    }

    return (
        <>
            <div className="container my-12 px-6 pb-4 bg-black bg-opacity-60">
                <InfoSection movie={movie}
                />
                <CastSection cast={cast}
                />
                <ReviewSection />
            </div>
        </>
    )
}

const InfoSection = ({ movie }: { movie: Movie }) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    return (
        <section className="flex flex-col md:flex-row items-center">
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
                <Tagline tagline={movie.tagline} />
                <Genres genres={movie.genres} />
                <Duration runtime={movie.runtime} />
                <ReleaseDate releaseDate={movie.release_date} />
                <button className="flex items-center px-4 py-2 rounded-md bg-red-500 text-white">
                    <BsBookmarkStar className="h-5 w-5 mr-2" />
                    Add to Favorites
                </button>
            </div>
        </section>
    )
}

const CastSection = ({ cast }: { cast: object[] }) => {
    const generateActorPoster = (profile_path: string) => {
        if (profile_path) {
            return `https://image.tmdb.org/t/p/w500${profile_path}`;
        }
        return noPoster;
    }

    const initialCast = cast.slice(0, 6);

    return (
        <section className="my-8">
            <h2 className="mb-4 text-2xl font-bold">Actors</h2>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {initialCast.map((actor: any) => {
                    return (
                        <div key={actor.id} className="mx-auto">
                            <Image
                                src={(generateActorPoster(actor.profile_path))}
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
        </section>
    );
}

const ReviewSection = () => {
    return (
        <section className="my-8">
            <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
            <div className="flex flex-col items-center justify-between md:flex-row">
                <Review
                    author="John Doe"
                    title="This movie is awesome"
                    content="This movie was so good. I loved it."
                />
                <Review
                    author="Jannet Kowalski"
                    title="Bad choice"
                    content="I was expecting more from this movie."
                />
                <Review
                    author="Maria Doe"
                    title="Could be better"
                    content="I liked the movie but it could have been better. I would recommend it to my friends."
                />
            </div>
        </section>
    );
};

const Tagline = ({ tagline }: { tagline: string }) => (
    <p className="text-2xl font-thin italic text-red-700 mb-5">{tagline}</p>
);

const Genres = ({ genres }: { genres: Array<{ id: number; name: string }> }) => (
    <p className="mb-2 text-lg font-bold text-gray-400">
        {genres.map((genre) => genre.name).join(', ')}
    </p>
);

const Duration = ({ runtime }: { runtime: number }) => (
    <p className="mb-2 text-lg font-bold text-gray-400">{`${runtime} min`}</p>
);


const ReleaseDate = ({ releaseDate }: { releaseDate: string }) => (
    <p className="mb-2 text-lg font-bold text-gray-400">{`Released on ${releaseDate}`}</p>
);

interface ReviewProps {
    author: string;
    title: string;
    content: string;
}

const Review = ({ author, title, content }: ReviewProps) => (
    <div className="w-full mb-4 md:w-1/2 md:mb-0">
        <div className="p-4 bg-white rounded-lg shadow-md">
            <p className="mb-2 text-gray-500">Posted by {author}</p>
            <p className="mb-2 text-lg font-semibold">{title}</p>
            <p className="text-gray-500">
                {content}
            </p>
        </div>
    </div>
);