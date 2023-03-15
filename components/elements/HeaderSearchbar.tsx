
export const HeaderSearchbar = () => {
    return(
        <div className="relative flex items-center w-full font-semibold text-gray-700 bg-gray-200 rounded-lg mt-5 md:w-1/2 md:order-1 md:mt-0">
            <input 
                type="text" 
                placeholder="Search movies..." 
                className="bg-transparent px-2 py-2 rounded-lg w-full pr-28 text-sm">
            </input>
            <button className="absolute top-0 right-0 bottom-0 py-2 px-4 rounded-r-lg bg-sky-700 text-white hover:opacity-90 transition-opacity text-sm">Search</button>
        </div>
    );
}