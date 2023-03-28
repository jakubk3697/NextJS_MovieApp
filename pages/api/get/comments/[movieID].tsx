import { NextApiRequest, NextApiResponse } from 'next';
import firebase from '@/firebase/clientApp';

/**
 * @param req - HTTP request object
 * @param res - HTTP response object
 * @description This endpoint fetches all comments for a movie from the Firebase Firestore database. 
 * If the movieID is missing from the request or no comments exist for the given movieID, 
 * the endpoint returns an appropriate error response. 
 * @returns A JSON response containing an array of comments for the specified movieID.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { movieID } = req.query;

  try {
    // Check if movieID parameter is missing
    if (!movieID) {
      res.status(400).json({ message: 'Invalid request - Missing movieID' });
      return;
    }

    const commentsRef = firebase.firestore().collection('comments').doc(`movie_${movieID}`);
    const commentsDoc = await commentsRef.get();

    // Check if comments document for the given movieID exists
    if (!commentsDoc.exists) {
      res.status(404).json({ message: `Comments not found for movieID ${movieID}` });
      return;
    }

    const commentsData = commentsDoc.data();
    const comments = commentsData?.comments || [];

    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: `Could not get comments - Error ${err}` });
  }
}
