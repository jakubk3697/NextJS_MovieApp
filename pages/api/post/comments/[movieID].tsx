import { NextApiRequest, NextApiResponse } from "next";
import firebase from "@/firebase/clientApp";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { movieID } = req.query;
      const { author, title, content } = req.body;

      // Add the new comment to the database
      const commentRef = firebase
        .firestore()
        .collection("comments")
        .doc(`movie_${movieID}`);

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
