/**
 * @param req - HTTP request object
 * @param res - HTTP response object
 * @description This endpoint adds a new comment to the Firebase Firestore database for the specified movieID. 
 * If the movieID is missing from the request or no comments exist for the given movieID, 
 * the endpoint returns an appropriate error response. 
 * @returns A JSON response indicating the success of the operation or an error message in case of invalid requests, missing data, or server errors.
 */
import { NextApiRequest, NextApiResponse } from "next";
import firebase from "@/firebase/clientApp";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { movieID } = req.query;
      const { author, title, content } = req.body;

      // Check if movieID parameter is missing
      if (!movieID) {
        res.status(400).json({ message: "Invalid request - Missing movieID" });
        return;
      }

      // Add the new comment to the database
      const commentRef = firebase
        .firestore()
        .collection("comments")
        .doc(`movie_${movieID}`);

      const commentsDoc = await commentRef.get();

      // Check if comments document for the given movieID exists
      if (!commentsDoc.exists) {
        res
          .status(404)
          .json({ message: `Comments not found for movieID ${movieID}` });
        return;
      }

      await commentRef.update({
        comments: firebase.firestore.FieldValue.arrayUnion({
          id: Date.now(),
          author: author,
          title: title,
          content: content,
        }),
      });

      res.status(201).json({ message: "Comment added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
