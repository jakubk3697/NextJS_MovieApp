
export const HeaderSearchbar = () => {
    return(
        <div className="relative flex items-center w-full mt-5 font-semibold text-gray-700 bg-gray-200 rounded-lg md:w-1/2 md:order-1 md:mt-0">
            <input 
                type="text" 
                placeholder="Search movies..." 
                className="w-full pr-28 py-2 pl-2 bg-transparent rounded-lg text-sm">
            </input>
            <button className="absolute top-0 right-0 bottom-0 py-2 px-4 rounded-r-lg bg-sky-700 text-sm text-white hover:opacity-90 transition-opacity ">Search</button>
        </div>
    );
}