import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { getMovieTitlesByAI } from '@/API/openaiAPI';
import { Loader } from '@/components/elements/Loader';

export default function AIMatchPage() {
    const router = useRouter();
    const { AIquery }: any = router.query;

    const [isRouterReady, setIsRouterReady] = useState(false);
    const [AIPrompt, setAIPrompt] = useState<string[]>(AIquery);
    
    // JSON.parse(aiMovieTitles)
    const fetchAIMovies = async () => {
        const response = await getMovieTitlesByAI({ queryKey: ['aiMovies', { AIPrompt }] });
        return response;
    }

    const {
        data: aiMovieTitles,
        isError: aiIsError,
        isSuccess: aiIsSuccess,
        isFetching: aiIsFetching,
    } = useQuery(['aimatch', { AIPrompt }], fetchAIMovies, {
        enabled: !!AIPrompt && AIPrompt.length > 6 && isRouterReady, 
    });

    useEffect(() => {
        if (router.isReady) {
            setIsRouterReady(true);
        }
    }, [router.isReady]);

    if (!isRouterReady) {
        return null;
    }

    if(AIquery !== AIPrompt) {
        setAIPrompt(AIquery);
    }

    if (aiIsFetching) return <Loader/>
    if (aiIsError) return router.push('/404');
    
    

    return (
        <>
            <h1 className="text-2xl font-semibold text-white md:text-3xl">Movies matched by AI:</h1>
        </>
    )
}