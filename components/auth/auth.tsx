// import firebase from '@/firebase/clientApp';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

// function SignInScreen() {
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleSignIn = async () => {
//     setLoading(true);
//     const provider = new firebase.auth.GithubAuthProvider();
//     try {
//       await firebase.auth().signInWithPopup(provider);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         router.push('/');
//       }
//     });
//   }, [router]);

//   return (
//     <div>
//       <button onClick={handleSignIn} disabled={loading}>
//         {loading ? 'Signing in...' : 'Sign in with GitHub'}
//       </button>
//     </div>
//   );
// }

// export default SignInScreen;
