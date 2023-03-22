import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @param req contains the body of the request which is taken from the CommentModal form component
 * @param res contains the response of the request. If the request is successful, the response will be a JSON object with a message property. 
 * @description This function is used to add a new comment to the database. It is called when the user submits the form in the CommentModal component.
 * @todo - add functionality to edit comments
 * @todo - add functionality to delete comments
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