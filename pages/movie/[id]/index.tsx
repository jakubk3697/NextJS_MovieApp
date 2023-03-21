import { Meta } from "@/components/Meta";
import MovieDetails from "@/components/MovieDetails/MovieDetails";

export default function MovieDetailsPage() {
    return (
        <>
            <Meta
                title="Movie Details"
                keywords="movies, movie app, movie details"
                description="Movie Details Page for choosen movie"
            />
            <MovieDetails />
        </>
    )
}