import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import axios from 'axios'
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [error, setError] = useState(null);

  const handleGptSearchClick = async () => {
    try {
      const searchQuery = searchText.current.value;

      const requestData = {
        query: searchQuery,
      };

      const response = await axios.post("http://localhost:4000/get-movie-recommendations", requestData);

      const gptMovies = response.data.movieNames
        .map((movie) => movie.replace(/[`\n]/g, '').trim()) 
        .filter(Boolean); 

      const movieResults = Array.isArray(response.data.movieResults)
        ? response.data.movieResults
        : [];

      console.log("Cleaned movie names: ", gptMovies);
      console.log("Movie results: ", movieResults);

      dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults }));

    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="pt-[35%] md:pt-[10%] w-[90vw] flex justify-center pb-4 bg-opacity-50 backdrop-filter backdrop-blur-lg backdrop-saturate-150 rounded-md font-martelsans">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12 rounded-md ml-8"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9 bg-gray-700 rounded"
          placeholder={lang[langKey].gptSearchPlaceholder || "Enter your movie preference..."}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search || "Search"}
        </button>
      </form>
      {error && (
        <ErrorPopup message={error} onClose={() => setError(null)} />
      )}
    </div>
  );
};

const ErrorPopup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      {/* Modal */}
      <div className="bg-white rounded-lg p-6 z-10 max-w-sm mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center text-red-700">
          Oops!
        </h2>
        <p className="text-gray-800 mb-2">{message}</p>
        <button
          className="w-full py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-600"
          onClick={onClose}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default GptSearchBar;
