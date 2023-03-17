import { useQuery } from 'react-query';
import Image from 'next/image';
import { fetchMovieSnapshots } from '@/API/moviedbAPI';
import { Loader } from '@/components/elements/Loader';
import Slider from 'react-slick';
import { SnapshostsSlick } from '@/utils/slickConfig';
import { MovieSnapshot } from '@/types';

export const MovieGallery = ({ movieId }: { movieId: number }) => {

    const { data: snapshots } = useQuery<object[]>(['movieSnapshots', movieId], () => fetchMovieSnapshots(Number(movieId)), {
        enabled: !!movieId,
    });

    const settings = SnapshostsSlick;

    return (
        <section className="py-10 border-b border-gray-500">
            <h2 className="mb-4 text-2xl font-bold">Movie snapchosts</h2>
            {snapshots ? (
                <div className="mx-10">
                    <Slider {...settings}>
                        {snapshots.map((snapshot: any) => (
                            <div key={snapshot.file_path}>
                                <div className="mx-2">
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w780${snapshot.file_path}`}
                                        alt={snapshot.file_path}
                                        width={780}
                                        height={400}
                                        className="rounded-md mx-auto object-fill"
                                    />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            )
                :
                <Loader />
            }
        </section>
    );
};
