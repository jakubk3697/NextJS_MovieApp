import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title } = req.query;
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${title}`;
    const { data } = await axios.get(url);

    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while fetching movies" });
  }
}

