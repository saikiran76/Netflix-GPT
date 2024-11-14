import express from 'express';
import { Request, Response } from 'express';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { console } from 'inspector';

dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string || "AIzaSyCumjP4dhxKlYalhwU2o3D2MAtCCrjx3ZI"); // Use the API key from environment variables
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Specify the model you're using

const searchMovieTMDB = async (movie: string) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}&include_adult=false&language=en-US&page=1`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movie data from TMDB:', error);
    return [];
  }
};

app.post('/get-movie-recommendations', async (req: Request, res: Response) => {
  const { query } = req.body;

  try {
    // Generate a movie recommendation prompt for the Gemini API
    const prompt = `Recommend 5 movies similar as per the request: "${query}. And do not ask any more questions. Just generate an array of strings which are the movie names"`;

    // Make a request to the Gemini model
    const result = await model.generateContent(prompt);

    console.log("the response: ", result)

    const gptMovies = (typeof result.response.text === 'function')
    ? result.response.text()
        .replace(/\n/g, '') // Remove newlines
        .replace(/[\\[\]"']/g, '') // Remove unwanted characters (brackets, quotes, etc.)
        .split(',') // Split by commas to get the movie names
        .map((movie: string) => movie.trim()) // Trim whitespace from each movie name
    : [];// Check the output

    console.log("movies: ", gptMovies)

    // Fetch movie details from TMDB for each of the recommended movies
    const tmdbResults = await Promise.all(
      gptMovies.map((movie: string) => searchMovieTMDB(movie))
    );

    // Extract the first movie from each TMDB result and filter out empty results
    const movieResults = tmdbResults.map((results: any) => results[0]).filter(Boolean);

    // Send back the movie names and details
    res.json({ movieNames: gptMovies, movieResults });
  } catch (error) {
    console.error('Error fetching movie recommendations:', error);
    res.status(500).json({ error: 'Failed to fetch movie recommendations.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
