import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames || !movieNames.length) return null;

  // Combine movieResults into a single array (assuming movieResults is an array of arrays or objects)
  const uniqueMovies = Array.from(new Set(movieResults.map(JSON.stringify))).map(JSON.parse);

  return (
    <div className="p-4 m-4 bg-gradient-to-b from-black via-transparent to-red-700 text-white bg-opacity-90 rounded-md font-martelsans">
      <div className="font-martelsans">
        <MovieList
          key="gpt-suggestions"
          title="GPT Movie Suggestions"
          movies={uniqueMovies}
        />
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
