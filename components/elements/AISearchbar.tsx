import { useRouter } from 'next/router';
import { useRef } from 'react';

export const AISearchbar = () => {
    const router = useRouter();
    const { AIquery }: any = router.query;
    const AIInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(AIInputRef.current && AIInputRef.current.value !== AIquery) {
            router.push(`/match?AIquery=${encodeURIComponent(AIInputRef.current.value)}`);
        }
    }

    return(
        <form 
            className="relative w-full pl-3 pr-3 lg:w-2/3"
            onSubmit={handleSubmit}
        >
            <input 
                type="text" 
                placeholder="Give movie taste tips and get matched movies from AI..." 
                className="py-2 px-2 pr-28 w-full text-sm bg-gray-700 text-white rounded-md md:text-base"
                ref={AIInputRef}
            >
            </input>
            <button 
                 type="submit"
                 className="absolute top-0 right-3 bottom-0 px-1 py-2 text-sm font-semibold italic rounded-l-none bg-gray-800 text-white rounded-r-md hover:bg-green-500 md:text-base"
            >
                Match movies
            </button>
        </form>
    );
}
