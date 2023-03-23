import { useRouter } from 'next/router';
import { useRef, useState, useEffect } from 'react';

/**
 * @description serachbar input where user can type movie taste tips and get matched movies which are taken from AI
 * Input value is passed to /match page. 
 * Initialy input value is send to openai api to get movie titles and then those titles are used to fetch movies from tmdb api
 */
export const AISearchbar = () => {
    const router = useRouter();
    const { AIquery }: any = router.query;
    const [isFormCorrect, setIsFormCorrect] = useState<boolean>(true);
    const AIInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setIsFormCorrect(true);
    }, [router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(AIInputRef.current && AIInputRef.current.value.length > 8) {
            setIsFormCorrect(true);
                if(AIInputRef.current.value !== AIquery) {
                    router.push(`/match?AIquery=${encodeURIComponent(AIInputRef.current.value)}`);
            }
        } else {
            setIsFormCorrect(false);
        }
    }

    return(
        <div>
            <form 
                className="relative w-full pl-3 pr-3 lg:w-2/3"
                onSubmit={handleSubmit}
            >
                <input 
                    type="text" 
                    placeholder="Give movie taste tips and get matched movies from AI..." 
                    className="py-2 px-2 pr-28 w-full text-sm bg-gray-700 text-white rounded-md md:text-base"
                    ref={AIInputRef}
                />
                <button 
                    type="submit"
                    className="absolute top-0 right-3 bottom-0 px-1 py-2 text-sm font-semibold italic rounded-l-none bg-gray-800 text-white rounded-r-md hover:bg-green-500 md:text-base"
                >
                    Match movies
                </button>
            </form>
            {!isFormCorrect && <span className="text-red-500 mt-2 pl-4">Input should contains more than 8 characters</span>}
        </div>
    );
}
