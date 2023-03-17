import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

interface IEvent {
    target: {
        value: string
    }
}

export const HeaderSearchbar = () => {
    const router = useRouter();
    const [query, setQuery] = useState('');

    const handleChange = (e: IEvent) => {
      setQuery(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/search?query=${encodeURIComponent(query)}`);
    }

    return(
        <form 
            className="relative flex items-center w-full mt-5 font-semibold text-gray-700 bg-gray-200 rounded-lg md:w-1/2 md:order-1 md:mt-0"
            onSubmit={(e) => handleSubmit(e)}
        >
            <input 
                type="text" 
                placeholder="Search movies..." 
                className="w-full pr-28 py-2 pl-2 bg-transparent rounded-lg text-sm over"
                value={query} 
                onChange={handleChange}
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
