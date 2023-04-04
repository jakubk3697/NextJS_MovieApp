import { imageLoader } from '@/utils/imageLoader';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Genre, Movie, MovieCardProps } from '@/types';
import noCardPoster from '@/public/images/no-poster.png';
import { fetchGenres } from '@/APIUtils/moviedbAPI';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/theme';

/**
 * 
 * @param movie given movie from themoviedb API
 * @description It generates all info about the movie as a card.
 * @description After mounting the component, it fetches the genres from the API and sets the state of the genres using useEffect hook.
 * @description It uses the Link component from next to navigate to the movie page.
 * @returns MovieCard component with the movie info and movie poster.
 */
export const MovieCard = ({ movie, genres }: MovieCardProps) => {
    const theme = useContext(ThemeContext);

    const translateGenreID = (id: number): string => {
        const genre = genres.find((genre) => genre.id === id);
        return genre ? genre.name : '';
    }

    const generateGenres = (movie: Movie) => {
        if (movie.genres) {
          return movie.genres.map((genre) => (
            <span
              key={genre.id}
              className={`${themeTextColor} inline-block mr-1 mt-1 px-1 py-0.5 border border-gray-600 rounded-full text-sm font-thin italic`}
            >
              {genre.name}
            </span>
          ));
        }
        return movie.genre_ids.map((genreID: number) => (
          <span
            key={genreID}
            className={`${themeTextColor} inline-block mr-1 mt-1 px-1 py-0.5 border border-gray-600 rounded-full text-sm font-thin italic`}
          >
            {translateGenreID(genreID)}
          </span>
        ));
      };
      

    const moviePosterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : noCardPoster;

    const themeTextColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-700';
    const themeBgColor = theme === 'dark' ? 'bg-black' : 'bg-gray-100';

    return (
        <div key={movie.id} className={`${themeBgColor} bg-opacity-90 rounded-xl hover:scale-110 transition-transform pb-3`}>
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
                    <div className={` ${themeTextColor} mb-2 mr-4 text-xl font-bold`}>{movie.title}</div>
                    <p className={`${themeTextColor} italic font-semibold"`}>{(movie.vote_average).toFixed(1)}</p>
                </div>
                <div className="px-3 pt-2 pb-1">
                    {generateGenres(movie)}
                </div>
            </Link>
        </div>
    )
}