import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <div className="bg-black mt-0 md:mt-28 sm:mt-1 w-[98.5vw]">
        <div className="mt-0 md:-mt-52 pl-5 md:pl-12 relative z-18">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies} />
          <MovieList title={"Popular Movies"} movies={movies.popularMovies} />
          <MovieList
            title={"Upcoming Movies"}
            movies={movies.UpcomingMovies}
          />
        </div>
      </div>
    )
  );
};
export default SecondaryContainer;
