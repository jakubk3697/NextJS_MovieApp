import { useSession } from 'next-auth/react';
import LoginBtn from '@/components/authentication/LoginBtn';
import Router from 'next/router';
import { useEffect } from 'react';
import { Loader } from '@/components/elements/Loader';

export default function Protected() {
    const { data: session, status } = useSession();
    console.log(session);
    
    useEffect(() => {
        if (status === 'unauthenticated') Router.replace('api/auth/signin'); 
    }, [status])

    if(status === 'loading') return <Loader />

    if(status === 'authenticated') {
        return (
            <div>
                <h1>Protected page</h1>
                <p>
                    {session ? `Welcome ${session?.user?.email}` : 'You need to be signed in to view this page'}
                </p>
                <LoginBtn />
            </div>
        )
    }
}