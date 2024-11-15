import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToBucketList } from "../utils/userSlice";
import { IMG_CDN_URL } from "../utils/constants";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MovieCard = ({ movie, hideAddButton }) => {
  const { poster_path, id, title } = movie || {};
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [movieAdded, setMovieAdded] = useState(false);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const location = useLocation();

  if (!poster_path) return null; // Return nothing if no poster path

  const handleAddToBucketList = () => {
    if (!user.uid || !user.isGuest) {
      // If not logged in or guest, prompt to log in or show an alert
      alert("Please sign in or continue as guest to add movies to your bucket list.");
      return;
    }
    dispatch(addToBucketList(movie.id));
    toast.success(`${movie.title} added to bucket list!`);
    setMovieAdded(true);
    setTimeout(() => {
      setMovieAdded(false);
    }, 2000);
  };

  const handleMoreInfo = () => {
    setShowInfoPopup(true);
  };

  const closePopup = () => {
    setShowInfoPopup(false);
  };

  // Determine if the user is on their bucket list page or if the add button should be hidden
  const isOnBucketListPage = location.pathname === "/bucket-list";
  const shouldHideAddButton = hideAddButton || isOnBucketListPage;

  return (
    <>
    <div className="w-36 md:w-48 pr-4 font-martelsans relative transform transition-transform hover:scale-105">
      <img
        alt={`${title || 'Movie Poster'}`}
        src={IMG_CDN_URL + poster_path}
        className="rounded-lg"
      />
      <h2 className="text-sm font-bold mt-2">{title || "Unknown Title"}</h2>
      {!shouldHideAddButton && (
        <button
          className={`mt-1 p-1 text-xs rounded transition ${
            movieAdded ? "bg-green-700 hover:bg-green-800" : "bg-red-700 hover:bg-red-800"
          }`}
          onClick={handleAddToBucketList}
          disabled={movieAdded} // Disable the button temporarily after adding
        >
          {movieAdded ? "Added!" : "Add to Bucket List"}
        </button>
      )}
      <button
        className="mt-1 p-1 text-xs bg-blue-700 rounded hover:bg-blue-800 transition"
        onClick={handleMoreInfo}
      >
        More Info
      </button>
      {showInfoPopup && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 flex flex-col items-center justify-center p-4">
          <h3 className="text-xl mb-4">Feature Coming Soon!</h3>
          <p>More info for this movie will be available soon.</p>
          <button
            className="mt-4 p-2 bg-red-700 rounded hover:bg-red-800 transition"
            onClick={closePopup}
          >
            Back
          </button>
        </div>
      )}
    </div>
    
    </>
  );
};

export default MovieCard;
