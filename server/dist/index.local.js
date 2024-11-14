"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
const inspector_1 = require("inspector");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 4000;
app.use(express_1.default.json());
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyCumjP4dhxKlYalhwU2o3D2MAtCCrjx3ZI"); // Use the API key from environment variables
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Specify the model you're using
const searchMovieTMDB = (movie) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}&include_adult=false&language=en-US&page=1`;
    try {
        const response = yield axios_1.default.get(url, {
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_TOKEN_KEY}`,
            },
        });
        return response.data.results;
    }
    catch (error) {
        inspector_1.console.error('Error fetching movie data from TMDB:', error);
        return [];
    }
});
app.post('/get-movie-recommendations', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.body;
    try {
        // Generate a movie recommendation prompt for the Gemini API
        const prompt = `Recommend 5 movies similar as per the request: "${query}. And do not ask any more questions. Just generate an array of strings which are the movie names"`;
        // Make a request to the Gemini model
        const result = yield model.generateContent(prompt);
        inspector_1.console.log("the response: ", result);
        const gptMovies = (typeof result.response.text === 'function')
            ? result.response.text()
                .replace(/\n/g, '') // Remove newlines
                .replace(/[\\[\]"']/g, '') // Remove unwanted characters (brackets, quotes, etc.)
                .split(',') // Split by commas to get the movie names
                .map((movie) => movie.trim()) // Trim whitespace from each movie name
            : []; // Check the output
        inspector_1.console.log("movies: ", gptMovies);
        // Fetch movie details from TMDB for each of the recommended movies
        const tmdbResults = yield Promise.all(gptMovies.map((movie) => searchMovieTMDB(movie)));
        // Extract the first movie from each TMDB result and filter out empty results
        const movieResults = tmdbResults.map((results) => results[0]).filter(Boolean);
        // Send back the movie names and details
        res.json({ movieNames: gptMovies, movieResults });
    }
    catch (error) {
        inspector_1.console.error('Error fetching movie recommendations:', error);
        res.status(500).json({ error: 'Failed to fetch movie recommendations.' });
    }
}));
app.listen(port, () => {
    inspector_1.console.log(`Server is running at http://localhost:${port}`);
});
