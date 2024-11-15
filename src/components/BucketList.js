import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import { CiViewList } from "react-icons/ci";
import axios from "axios"; // for fetching movie details

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const BucketList = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const isLoggedIn = user && user.uid;
  const [bucketListMovies, setBucketListMovies] = useState([]);

  // If user is not logged in and not a guest, redirect to login
  useEffect(() => {
    if (!isLoggedIn && !user.isGuest) {
      navigate("/");
    } else {
      // If user is logged in or a guest, fetch the movies
      const fetchMovies = async () => {
        const uniqueMovieIds = Array.from(new Set(user.bucketList));
        const movieDetails = [];
        for (const movieId of uniqueMovieIds) {
          const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
          try {
            const response = await axios.get(url);
            movieDetails.push(response.data);
          } catch (error) {
            console.error("Error fetching movie details:", error);
          }
        }
        setBucketListMovies(movieDetails);
      };
      fetchMovies();
    }
  }, [isLoggedIn, user, navigate]);

  return (
    <div className="font-martelsans bg-black h-screen">
      <Header />
      <h1 className="text-white m-4 font-bold font-martelsans ml-10 mt-7 text-3xl">My Bucket List</h1>
      {bucketListMovies.length === 0 ? (
        <p className="text-white m-4 mt-[27vh] font-martelsans flex gap-4 justify-center items-center text-3xl"><CiViewList/>Your bucket list is empty. <p className="block">Add something</p></p>
      ) : (
        <div className="flex flex-wrap p-4">
          {bucketListMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BucketList;
