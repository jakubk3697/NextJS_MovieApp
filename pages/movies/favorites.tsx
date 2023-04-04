import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/elements/Loader';
import firebase from '@/firebase/clientApp';
import { useQuery } from 'react-query';
import MovieCards from '@/components/MovieCards';

async function fetchMovie(movieId: number) {
    const response = await fetch(`/api/get/movie/${movieId}`);
    const data = await response.json();
    return data;
}
 
export default function Favorites() {
    const { data: session, status } = useSession();
    console.log(session);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    const { data, isFetching } = useQuery('favoriteMovies', async () => {
        const favoriteMovies = await Promise.all(favorites.map((movieId: number) => fetchMovie(movieId)));
        return favoriteMovies;
    }, 
    {
        enabled: !!favorites.length,
    });

    useEffect(() => {
        if (status === 'unauthenticated') Router.replace('/auth/signIn'); 
        const fetchFavorites = async () => {
            if(session?.user?.email) {
                const favoritesRef = firebase.firestore().collection('favorites').doc(session.user.email);
                const favoritesDoc = await favoritesRef.get();

                const favoritesData = favoritesDoc.data();
                const favorites = favoritesData?.favorites || [];

                setFavorites(favorites);
            }
            setLoading(false);
        }
        fetchFavorites();
    }, [session, status])

    if(status === 'loading' || loading || isFetching) return <Loader />
 
    if(status === 'authenticated' && !!data) {
        console.log(data);
        return (
            <div>
                <h2 className="text-2xl mb-6 font-bold text-gray-200">Favorites movies:</h2>
                <MovieCards movies={data} />
            </div>
        )
    }
}