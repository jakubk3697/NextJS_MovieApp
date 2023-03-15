import { imageLoader } from '@/utils/imageLoader';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Genre, MovieCardProps } from '@/types';
import noCardPoster from '@/public/no_card_poster.png';

interface keyable {
    [key: string]: any;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        const fetchGenres = async () => {
          const res = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
          );
          const data = await res.json();
          setGenres(data.genres);
        };
    
        fetchGenres();
      }, []);
    
      const getGenre = (id: number): string => {
        const genre = genres.find((genre) => genre.id === id);
        return genre ? genre.name : '';
      };

      const moviePosterUrl =  movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : noCardPoster;

    return (
        <div key={movie.id} className="bg-black bg-opacity-90 rounded-xl hover:scale-110 transition-transform pb-3">
            <Link href={`/movie/${movie.id}`}>
                    <Image 
                        src={moviePosterUrl}
                        width={300}
                        height={450}
                        alt={movie.title}
                        loader={imageLoader}
                        unoptimized
                        className="w-full rounded-t-xl"
                    />
                    <div className="flex justify-between px-3 py-2">
                        <div className="mb-2 mr-4 text-xl font-bold">{movie.title}</div>
                        <p className="text-gray-400 italic font-semibold">{movie.vote_average}</p>
                    </div>
                    <div className="px-3 pt-2 pb-1">
                       {movie.genre_ids.map((genre: number) => (
                        <span 
                            className="inline-block mr-1 mt-1 px-1 py-0.5 border border-gray-600 rounded-full text-sm font-thin italic text-gray-200"
                            key={genre}
                         >
                            {getGenre(genre)}
                        </span>)
                       )}
                    </div>
            </Link>
        </div>
    )
}