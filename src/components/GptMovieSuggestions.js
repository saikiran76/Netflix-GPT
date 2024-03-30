import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  //extract movie results and movie names from gpt store (from store.gpts)
  const { movieResults, movieNames } = useSelector((store) => store.gpt); 

  // When movie name isnt still loaded 
  if (!movieNames) return null;

  return (
    <div className="mv-sug p-4 m-4 bg-gradient-to-b from-black via-transparent to-red-700 text-white bg-opacity-90 rounded-md font-martelsans">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};
export default GptMovieSuggestions;
