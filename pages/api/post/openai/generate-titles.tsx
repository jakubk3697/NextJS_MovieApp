import { OpenAIApi, Configuration } from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const configuration = new Configuration({apiKey});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST" && req.body.prompt !== "") {
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${req.body.prompt}}`,
        temperature: 0.3,
        max_tokens: 500,
      });

      const response = completion.data.choices[0].text || "Nothing found.";

      res.status(200).json({ text: response });
      res.status(400).json({ text: "No prompt provided." });
      res.status(500).json({ text: "Something went wrong." });
    } catch (err) {
      res.status(500).json({ message: `Could not get comments - Error ${err}` });
    }
  }
};
