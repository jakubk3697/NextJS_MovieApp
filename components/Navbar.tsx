import Link from "next/link";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const genres = [
    { name: "Action", path: "action" },
    { name: "Comedy", path: "comedy" },
    { name: "Drama", path: "drama" },
    { name: "Horror", path: "horror" },
    { name: "Thriller", path: "thriller" },
  ];

  const categories = [
      {name: 'Popular', path: 'popular'},
      {name: 'Top Rated', path: 'top_rated'},
      {name: 'Upcoming', path: 'upcoming'},
      {name: 'Now Playing', path: 'now_playing'},
  ];
  
    
  return (
    <nav className="bg-gray-900 py-2 px-2 flex flex-col justify-between mt-10 mb-8 rounded-xl">
      <div className="flex items-center mb-3">
        {categories.map((category) => (
          <Link 
            key={category.path} 
            href={`/movies/${category.path}`}
            className="text-gray-200 text-md mx-2 transition duration-200 ease-in-out transform hover:scale-105 hover:text-gray-200 hover:bg-gray-700 rounded-full p-2"
          >
            {category.name}
          </Link>
        ))}
      </div>
         <div className="w-2/3 mx-auto flex justify-between items-center pb-3">
        <div className="relative w-full">
          <input
            type="text"
            className="bg-gray-700 text-white rounded-md py-2 px-4 w-full"
            placeholder="Give movie taste tips and get movies matched by AI..."
          />
          <button className="absolute font-semibold italic top-0 right-0 bottom-0 rounded-l-none bg-gray-800 hover:bg-green-500 text-white px-2 py-2 rounded-r-md">
            Match movies
          </button>
        </div>
      </div>
    </nav>
  );
}