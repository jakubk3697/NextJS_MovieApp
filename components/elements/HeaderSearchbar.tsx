
export const HeaderSearchbar = () => {
    return(
        <div className="flex items-center w-full font-semibold text-gray-700 bg-gray-200 rounded-lg mt-5 md:w-1/2 md:order-1 md:mt-0">
            <input 
                type="text" 
                placeholder="Search movies..." 
                // write box shadow tailwind version here
                className="bg-transparent px-2 py-2 rounded-lg w-full">
            </input>
            <button className="py-2 px-4 rounded-r-lg bg-sky-700 text-white hover:opacity-90 transition-opacity">Search</button>
        </div>
    );
}