import { useSession } from 'next-auth/react';
import LoginBtn from '@/components/authentication/LoginBtn';
import Router from 'next/router';
import { useEffect } from 'react';
import { Loader } from '@/components/elements/Loader';

export default function Favorites() {
    const { data: session, status } = useSession();
    console.log(session);
    
    useEffect(() => {
        if (status === 'unauthenticated') Router.replace('/auth/signIn'); 
    }, [status])

    if(status === 'loading') return <Loader />

    if(status === 'authenticated') {
        return (
            <div>
                {/* <p className="text-sm text-gray-600 mb-5">Logged as: {session?.user?.email}</p> */}
                <h2 className="text-2xl font-bold text-gray-200">Favorites movies:</h2>
                
            </div>
        )
    }
}