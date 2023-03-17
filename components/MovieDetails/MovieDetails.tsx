import { Movie, Movies } from '@/types';
import { fetchMovieByID, fetchMovieCastByID, fetchSimiliarMovies } from '@/API/moviedbAPI';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Loader } from '@/components/elements/Loader';
import { Cast } from './Cast';
import { MainInfo } from './MainInfo';
import { Reviews } from './Reviews';
import { SimiliarMovies } from './SimiliarMovies';


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

    const { data: movies } = useQuery<Movie[]>(['similiarMovies', id], () => fetchSimiliarMovies(Number(id)), {
        enabled: isRouterReady && !!id,
    })

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

    const movieData = !!movies ? movies : [];

    return (
        <>
            <div className="container my-12 px-6 pb-4 bg-black bg-opacity-60 overflow-hidden">
                <MainInfo movie={movie} />
                <Cast cast={cast} />
                <Reviews />
                <SimiliarMovies movies={movieData} />
            </div>
        </>
    )
}