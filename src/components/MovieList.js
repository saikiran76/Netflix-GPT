import React from 'react';
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  // Make sure the movies prop is an array before mapping
  const movieArray = Array.isArray(movies) ? movies : [];

  return (
    <div className="px-6">
      <h1 className="text-lg md:text-3xl py-4 text-white font-martelsans">{title}</h1>
      <div className="flex overflow-x-scroll custom-scrollbar">
        <div className="flex">
          {movieArray.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
