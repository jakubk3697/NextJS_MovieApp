import { useRouter } from 'next/router';
import { useRef } from 'react';

export const HeaderSearchbar = () => {
    const router = useRouter();
    const inpRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(inpRef.current) {
            router.push(`/search?query=${encodeURIComponent(inpRef.current.value)}`);
        }
    }

    return(
        <form 
            className="relative flex items-center w-full mt-5 font-semibold text-gray-700 bg-gray-200 rounded-lg md:w-1/2 md:order-1 md:mt-0"
            onSubmit={handleSubmit}
        >
            <input 
                type="text" 
                placeholder="Search movies..." 
                className="w-full pr-28 py-2 pl-2 bg-transparent rounded-lg text-sm over"
                ref={inpRef}
            >
            </input>
            <button 
                 type="submit"
                 className="absolute top-0 left-full -translate-x-full bottom-0 py-2 px-4 rounded-r-lg rounded-l-none bg-sky-700 text-sm text-white hover:opacity-90 transition-opacity"
            >
                Search
            </button>
        </form>
    );
}
