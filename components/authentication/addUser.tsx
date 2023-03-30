import firebase from '@/firebase/clientApp';
import { addDoc, collection } from 'firebase/firestore';

const db = firebase.firestore();

export async function addUser(username: string, email: string, password: string, role: string) {
  try {
  /**
   * @description Create a user with Firebase Authentication (this way is secure - password hasing and salting)
     The uid will be the document ID.
   */
    const authResult = await firebase.auth().createUserWithEmailAndPassword(email, password);

    if (authResult.user) {
      // Get the user's uid
      const uid = authResult.user.uid;

      // Create the user object with the uid
      const user = {
        uid,
        username,
        email,
        role,
      };

    /**
     * @description Add the user to the Firestore database. 
        In firestore we have more data than in firebase auth. We can use the uid to link the two.
        We also have more data to authorize different users for different pages.
      */
      const docRef = await addDoc(collection(db, 'users'), user);
      console.log('User added with ID:', docRef.id);
    } else {
      console.error('User not created');
    }
  } catch (e) {
    console.error('Error adding user:', e);
  }
}
