import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

/**
 * @description on small screen devices, it renders the hamburger menu icon which can be used to toggle the navbar.
 * @description on large screen devices, it renders the navbar with the categories [Popular, Top Rated, Upcoming, Now Playing]
 * @description categories can be used to navigate to the movies page with the selected category. 
 * @returns The navbar component with the categories [Popular, Top Rated, Upcoming, Now Playing]
 */
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    { name: "Popular", path: "popular" },
    { name: "Top Rated", path: "top_rated" },
    { name: "Upcoming", path: "upcoming" },
    { name: "Now Playing", path: "now_playing" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex flex-col py-2 px-2 justify-between mt-10 mb-8 rounded-xl bg-gray-900">
      <div className="relative flex items-center justify-between">
        <div className="flex flex-col w-full mb-3 mt-6 text-center md:flex-row md:items-center md:mt-0 md:w-auto">
          {categories.map((category) => (
            <Link
              key={category.path}
              href={`/movies/${category.path}`}
              className={`${
                isMenuOpen ? "block" : "hidden"
              }  text-gray-200 my-2 p-2 rounded-full transition duration-200 ease-in-out transform hover:scale-105 hover:text-gray-200 hover:bg-gray-700 md:block md:my-0 md:mx-2`}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <div className={`${isMenuOpen && "absolute top-0 right-0 mb-5" } flex items-center`}>
          <button
            className="px-3 py-2 text-gray-200 text-xl rounded-md hover:bg-gray-700 md:hidden"
            onClick={toggleMenu}
          >
            <FaBars />
          </button>
        </div>
      </div>
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } w-full flex flex-col sm:block `}
      >

      </div>
      <div className="w-full flex justify-between items-center mx-auto pb-3 px-2 mt-2">
        <div className="relative w-full lg:w-2/3">
          <button 
            className="absolute top-0 right-0 bottom-0 px-1 py-2 text-sm font-semibold italic rounded-l-none bg-gray-800  text-white rounded-r-md hover:bg-green-500 md:text-base"
          >
            Match movies
          </button>
          <input
            type="text"
            className="py-2 px-2 pr-28 w-full text-sm bg-gray-700 text-white rounded-md md:text-base"
            placeholder="Give movie taste tips and match movies from AI..."
          />
        </div>
      </div>
    </nav>
  );
};
