import Image from "next/image";
import noCardPoster from "@/public/images/no-poster.png"
import Slider from "react-slick";
import { CastSlick } from "@/utils/slickConfig";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

/**
 * 
 * @param {object[]} cast - array of objects with cast members
 * @description It generates a slick slider with cast members and their profile pictures
 * @returns {JSX.Element} - returns a section with cast members
 */
export const Cast = ({ cast }: { cast: object[] }) => {
    const generateActorPoster = (profile_path: string) => {
      if (profile_path) {
        return `https://image.tmdb.org/t/p/w500${profile_path}`;
      }
      return noCardPoster;
    };

    const settings = CastSlick;
  
    return (
      <>
      <section className="py-10 border-b border-gray-500">
        <h2 className="mb-4 text-2xl font-bold">Cast</h2>
        <div className="mx-10">
        <Slider {...settings}>
          {cast.map((actor: any) => {
            return (
              <div key={actor.id}>
                <div className="mx-2 text-center hover:scale-105 transition-transform">
                  <Image
                    src={generateActorPoster(actor.profile_path)}
                    alt={actor.name} 
                    width={200}
                    height={225}
                    className="rounded-md mx-auto"
                  />
                  <p className="my-2 text-lg font-semibold">{actor.name}</p>
                  <p className="text-gray-300">{actor.character}</p>
                </div>
              </div>
            );
          })}
        </Slider>
        </div>
      </section>
      </>
    );
  };