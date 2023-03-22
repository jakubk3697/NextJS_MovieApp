import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @param req contains the body of the request which is taken from the CommentModal form component
 * @param res contains the response of the request. If the request is successful, the response will be a JSON object with a message property. 
 * @description This function is a endpoint for the Next.js API. It is used to add a comment to the database.
 * @todo change collection name to include movie id in the future e.g. comments_movie-{movieId} 
 * @returns Promise object
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const data = req.body;

            const client = await MongoClient.connect(process.env.MONGODB_URI as string);

            const db = client.db();
            const commentsCollection = db.collection('comments');

            const result = await commentsCollection.insertOne(data);

            client.close();

            res.status(201).json({ message: `Comment with ID ${result.insertedId} added successfully!` });
        } catch (err) {
            res.status(500).json({ message: `Could not add comment - Error ${err}` });
        }
    }
}