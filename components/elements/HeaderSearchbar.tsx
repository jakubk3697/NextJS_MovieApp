import { useRouter } from 'next/router';
import { useRef, useState, useEffect } from 'react';

export const HeaderSearchbar = () => {
    const router = useRouter();
    const { query }: any = router.query;
    
    const inpRef = useRef<HTMLInputElement>(null);
    const [isFormCorrect, setIsFormCorrect] = useState<boolean>(true);

    useEffect(() => {
        setIsFormCorrect(true);
    }, [router]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(inpRef.current && inpRef.current.value.length > 8 && inpRef.current.value !== query) {
            setIsFormCorrect(true);
            router.push(`/search?query=${encodeURIComponent(inpRef.current.value)}`);
        } else{
            setIsFormCorrect(false);
        }
    }

    return(
        <div className='relative w-full md:w-1/2 md:order-1 md:mt-0'>
            <form 
                className="relative flex items-center w-full mt-5 font-semibold text-gray-700 bg-gray-200 rounded-lg md:mt-0"
                onSubmit={handleSubmit}
            >
                <input 
                    type="text" 
                    placeholder="Search movies..." 
                    className="w-full pr-28 py-2 pl-2 bg-transparent text-sm over"
                    ref={inpRef}
                >
                </input>
                <button 
                    type="submit"
                    className="absolute top-0 bottom-0 right-0 py-2 px-5 rounded-r-lg rounded-l-none bg-sky-700 text-sm text-white hover:opacity-90 transition-opacity"
                >
                    Search
                </button>
            </form>
            {!isFormCorrect && <span className="absolute text-red-500">Input should contains more than 8 characters</span>}
        </div>
    );
}
