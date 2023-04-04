// pages/api/user/create.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import firebase from '@/firebase/clientApp';
import { addDoc, collection } from 'firebase/firestore';

const db = firebase.firestore();

const errorMessages: Record<string, string> = {
  'auth/email-already-in-use': 'The email address is already in use.',
  'auth/invalid-email': 'The email address is not valid.',
  'auth/operation-not-allowed': 'Email and password accounts are not enabled.',
  'auth/weak-password': 'The password is too weak.',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
      res.status(400).json({ error: 'All fields are required.' });
      return;
    }

    try {
      const authResult = await firebase.auth().createUserWithEmailAndPassword(email, password);

      if (authResult.user) {
        const uid = authResult.user.uid;

        const user = {
          uid,
          username,
          email,
          role,
        };

        await addDoc(collection(db, 'usersData'), user);
        res.status(200).json({ message: 'User created successfully.' });
      } else {
        res.status(500).json({ error: 'User not created.' });
      }
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = errorMessages[errorCode];

      if (errorMessage) {
        res.status(400).json({ error: errorMessage });
      } else {
        res.status(500).json({ error: 'An error occurred while creating the user.' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
