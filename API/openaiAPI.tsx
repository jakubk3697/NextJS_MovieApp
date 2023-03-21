import axios from "axios";

const AI_APIKEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

/**
 * 
 * @param {string} AIquery - query from url taken from 'match' page
 * @returns {Promise<string>} - stringified array of movie titles from OpenAI API
 * @description It sends prompt as POST request to the OpenAI API with included query from url taken from 'match' page and returns stringified array of movie titles which are 
 *            best fit for the query
 */
export const queryMovieTitlesByAI = async ({AIquery}: {AIquery: string}) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_APIKEY}`,
    };

    const data = {
        'model': "text-davinci-003",
        'prompt': `
        Read and parse the value from the following INPUT, which contains information sent by the user about their movie taste, thenthen return the six movie titles that best match that input. If you don't understand the INPUT return the random most liked movies of this year. 
        Return only the titles in the JavaScript array, nothing else is included.
        INPUT={${AIquery}}
        `,
        'temperature': 0.3,
        'max_tokens': 500,
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', data, { headers });
        const JSONResponse = response.data.choices[0].text;
        return JSONResponse;
    } catch (error) {
        console.error(error);
    }
}