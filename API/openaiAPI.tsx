import axios from "axios";

const AI_APIKEY = process.env.NEXT_PUBLIC_OPENAI_API_SECOND_KEY;

export const getMoviesByAI = async ({ queryKey }: any) => {
    const [_key, { AIPrompt  }] = queryKey;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_APIKEY}`,
    };

    const data = {
        'model': "text-davinci-003",
        'prompt': `
        Read and parse the value from the following INPUT, which contains information sent by the user about their movie taste, thenthen return the six movie titles that best match that input. If you don't understand the INPUT return the most popular movies of that year. 
        Return only the titles in the JavaScript array, nothing else is included.
        INPUT={${AIPrompt }}
        `,
        'temperature': 0.3,
        'max_tokens': 500,
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', data, { headers });
        const JSONResponse = JSON.parse(response.data.choices[0].text);
        return JSONResponse;
    } catch (error) {
        console.error(error);
    }
}