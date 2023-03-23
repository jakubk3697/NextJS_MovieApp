import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET') {
        try {
            const {movieID} = req.query;

            const client = await MongoClient.connect(process.env.MONGODB_URI as string);

            const db = client.db();
            const commentsCollection = db.collection(`${movieID}_comments`);

            const comments = await commentsCollection.find().toArray();

            client.close();

            res.status(200).json(comments);
        } catch (err) {
            res.status(500).json({ message: `Could not get comments - Error ${err}` });
        }
    }
}