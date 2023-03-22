import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
// api/new-comment
// POST /api/new-comment

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method === 'POST') {
        const data = req.body;
        // const {title, content, author} = data;

        const client = await MongoClient.connect("mongodb+srv://jakubkaminski3697:60xLW30BfKCjgB3Z@nextjs-database.s5fpba6.mongodb.net/comments?retryWrites=true&w=majority");

        const db = client.db();
        const commentsCollection = db.collection('comments');

        const result = await commentsCollection.insertOne(data);

        console.log(result);

        client.close();
        
        res.status(201).json({message: 'Comment inserted!'});
    }
} 