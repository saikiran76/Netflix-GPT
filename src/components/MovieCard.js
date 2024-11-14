import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) return null; // Return nothing if no poster path

  return (
    <div className="w-36 md:w-48 pr-4 font-martelsans">
      <img
        alt="Movie Card"
        src={IMG_CDN_URL + posterPath}
        className="rounded-lg"
      />
    </div>
  );
};

export default MovieCard;
