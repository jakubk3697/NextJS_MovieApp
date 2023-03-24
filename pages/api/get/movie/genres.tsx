import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } =  await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);

    return res.status(200).json(data);
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred while fetching movies" });
  }
}