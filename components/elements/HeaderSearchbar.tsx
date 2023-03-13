
export const HeaderSearchbar = () => {
    return(
        <div className="flex items-center w-full mt-5 md:w-1/2 md:order-1 md:mt-0">
            <input 
                type="text" 
                placeholder="Search movies..." 
                className="block font-semibold text-gray-700 bg-gray-200 rounded-lg px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 w-full">
            </input>
        </div>
    );
}