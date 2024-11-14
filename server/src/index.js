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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var axios_1 = require("axios");
var generative_ai_1 = require("@google/generative-ai");
var dotenv_1 = require("dotenv");
var inspector_1 = require("inspector");
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = 4000;
app.use(express_1.default.json());
var genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyCumjP4dhxKlYalhwU2o3D2MAtCCrjx3ZI"); // Use the API key from environment variables
var model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }); // Specify the model you're using
var searchMovieTMDB = function (movie) { return __awaiter(void 0, void 0, void 0, function () {
    var url, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = "https://api.themoviedb.org/3/search/movie?query=".concat(encodeURIComponent(movie), "&include_adult=false&language=en-US&page=1");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.get(url, {
                        headers: {
                            Authorization: "Bearer ".concat(process.env.REACT_APP_TOKEN_KEY),
                        },
                    })];
            case 2:
                response = _a.sent();
                return [2 /*return*/, response.data.results];
            case 3:
                error_1 = _a.sent();
                inspector_1.console.error('Error fetching movie data from TMDB:', error_1);
                return [2 /*return*/, []];
            case 4: return [2 /*return*/];
        }
    });
}); };
app.post('/get-movie-recommendations', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var query, prompt_1, result, gptMovies, tmdbResults, movieResults, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = req.body.query;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                prompt_1 = "Recommend 5 movies similar as per the request: \"".concat(query, ". And do not ask any more questions. Just generate an array of strings which are the movie names\"");
                return [4 /*yield*/, model.generateContent(prompt_1)];
            case 2:
                result = _a.sent();
                inspector_1.console.log("the response: ", result);
                gptMovies = (typeof result.response.text === 'function')
                    ? result.response.text()
                        .replace(/\n/g, '') // Remove newlines
                        .replace(/[\\[\]"']/g, '') // Remove unwanted characters (brackets, quotes, etc.)
                        .split(',') // Split by commas to get the movie names
                        .map(function (movie) { return movie.trim(); }) // Trim whitespace from each movie name
                    : [];
                inspector_1.console.log("movies: ", gptMovies);
                return [4 /*yield*/, Promise.all(gptMovies.map(function (movie) { return searchMovieTMDB(movie); }))];
            case 3:
                tmdbResults = _a.sent();
                movieResults = tmdbResults.map(function (results) { return results[0]; }).filter(Boolean);
                // Send back the movie names and details
                res.json({ movieNames: gptMovies, movieResults: movieResults });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                inspector_1.console.error('Error fetching movie recommendations:', error_2);
                res.status(500).json({ error: 'Failed to fetch movie recommendations.' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    inspector_1.console.log("Server is running at http://localhost:".concat(port));
});
