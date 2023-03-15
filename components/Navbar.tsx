import Link from "next/link";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

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
    <nav className="bg-gray-900 py-2 px-2 flex flex-col justify-between mt-10 mb-8 rounded-xl">
      <div className="flex items-center justify-between relative">
        <div className="flex flex-col w-full mb-3 mt-6 text-center md:flex-row md:items-center md:mt-0 md:w-auto">
          {categories.map((category) => (
            <Link
              key={category.path}
              href={`/movies/${category.path}`}
              className={`${
                isMenuOpen ? "block" : "hidden"
              } md:block text-gray-200 my-2 md:my-0 md:mx-2 transition duration-200 ease-in-out transform hover:scale-105 hover:text-gray-200 hover:bg-gray-700 rounded-full p-2`}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <div className={`${isMenuOpen ? "absolute top-0 right-0 mb-5" : ""} flex items-center`}>
          <button
            className="text-gray-200 text-xl px-3 py-2 rounded-md hover:bg-gray-700 md:hidden"
            onClick={toggleMenu}
          >
            <FaBars />
          </button>
        </div>
      </div>
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } sm:block w-full flex flex-col`}
      >

      </div>
      <div className="w-full mx-auto flex justify-between items-center pb-3 px-2 mt-2">
        <div className="relative w-full lg:w-2/3">
          <button className="absolute text-sm font-semibold italic top-0 right-0 bottom-0 rounded-l-none bg-gray-800  text-white px-1 py-2 rounded-r-md hover:bg-green-500 md:text-base">
            Match movies
          </button>
          <input
            type="text"
            className="bg-gray-700 text-white rounded-md py-2 px-2 pr-28 w-full text-sm md:text-base"
            placeholder="Give movie taste tips and match movies from AI..."
          />
        </div>
      </div>
    </nav>
  );
};
