import { Movie } from '@/types';
import { fetchMovieByID, fetchMovieCastByID, fetchSimiliarMovies } from '@/API/moviedbAPI';
import { CommentsProps } from '@/types';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { MongoClient } from 'mongodb';

import { Meta } from "@/components/Meta";
import { Loader } from '@/components/elements/Loader';
import { MainInfo } from "@/components/MovieDetails/MainInfo";
import { Cast } from "@/components/MovieDetails/Cast"; 
import { MovieGallery } from "@/components/MovieDetails/MovieGallery";
import { Comments } from "@/components/MovieDetails/Comments"; 
import { SimiliarMovies } from "@/components/MovieDetails/SimiliarMovies";

/**
 * @description It uses the movie id from the url to fetch the movie details. 
 * @description Two queries are used to fetch the data. One for the movie details and the other for the cast.
 * @description UseEffect is used to set the state of the router to true when the router is ready.
 * @description *Important: Both queries are enabled only when the router is ready and the id is available.
 * @returns MovieDetails page with the details of the movie and the cast of the movie
 * 
 */
export default function MovieDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [isRouterReady, setIsRouterReady] = useState(false);
    const [queryTrigger, setQueryTrigger] = useState(true);

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
            { (
                <>
                    <Meta
                      title="Movie Details"
                      keywords="movies, movie app, movie details"
                      description="Movie Details Page for choosen movie"
                    />
                    <div className="container my-12 px-6 pb-4 bg-black bg-opacity-60 overflow-hidden">
                        <MainInfo movie={movie} />
                        <Cast cast={cast} />
                        <MovieGallery movieId={Number(id)}/>
                        <Comments  />
                        <SimiliarMovies movies={movieData} />
                    </div>
                </>
            )}
        </>
    )
}



/**
 * @todo Move this component to 'Comments' because currently all MovieDetails is rendered SSR and it's not necessary and very slow
 */
// export async function getServerSideProps(context: any) {
//     const client = await MongoClient.connect(process.env.MONGODB_URI as string);
//     const db = client.db();

//     const { id } = context.params;
//     const commentsCollection = db.collection(`${id}_comments`);

//     const comments = await commentsCollection.find().toArray();

//     client.close();

//     return {
//         props: {
//             comments: comments.map(comment => ({
//                 id: comment._id.toString(),
//                 title: comment.title,
//                 content: comment.content,
//                 author: comment.author,
//             }))
//         },
//     }
// }