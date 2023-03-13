import { imageLoader } from '@/utils/imageLoader';
import Image from 'next/image'
import Link from 'next/link'

interface keyable {
    [key: string]: any;
}

export const MovieCard = ({ movie }: keyable) => {
    return (
        <div key={movie.id} className="bg-black rounded-xl">
            <Link href={`movie/${movie.id}`}>
                    <Image 
                        src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                        width={200}
                        height={100}
                        alt={movie.title}
                        loader={imageLoader}
                        unoptimized
                        className="w-full"
                    />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{movie.title}</div>
                        <p className="text-gray-700 text-base">
                            {movie.overview.slice(0, 40) + "..."}
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                       {movie.genre_ids.map((genre: number) => (
                        <span 
                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-1"
                            key={genre}
                         >
                            {genre}
                        </span>)
                       )}
                    </div>
            </Link>
        </div>
    )
}