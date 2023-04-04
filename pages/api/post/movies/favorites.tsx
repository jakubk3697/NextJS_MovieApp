import { NextApiRequest, NextApiResponse } from "next";
import firebase from "@/firebase/clientApp";

const firestore = firebase.firestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const { movieId, userEmail } = req.body;

  if (!movieId || !userEmail) {
    res.status(400).send("Movie ID and User Email are required");
    return;
  }

  try {
    const userRef = firestore.collection("favorites").doc(userEmail);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      await userRef.set({
        favorites: [movieId],
      },
      { merge: true });
    } else {
      await userRef.update({
        favorites: firebase.firestore.FieldValue.arrayUnion(movieId),
      })
    }

    res.status(200).send("Added first movie to favorites");
    res.status(201).send("Updated movie collection to favorites");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
