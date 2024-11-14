import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const isLoggedIn = user && user.uid;
  const [recommendationsCount, setRecommendationsCount] = useState(0);
  const [recommendations, setRecommendations] = useState([]);

  // If user is not logged in, redirect to login
  useEffect(() => {
    if (!isLoggedIn && !user.isGuest) {
      navigate("/");
    } else {
      // Dummy data for recommendations
      // In a real scenario, you'd fetch this from your backend or store
      setRecommendationsCount(recommendations.length);
    }
  }, [isLoggedIn, navigate, recommendations]);

  return (
    <div>
      <Header />
      <div className="p-6 text-white">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <p className="mt-4">Hello, {user?.displayName || "User"}!</p>
        <p>Bucket List Count: {user?.bucketList.length || 0}</p>
        <p>Recommendations Generated: {recommendationsCount}</p>
        <button
          className="mt-4 py-2 px-4 bg-red-700 rounded hover:bg-red-800 transition"
          onClick={() => navigate("/bucket-list")}
        >
          View My Bucket List
        </button>
        {/* Additional analytics or a list of past recommendations could be displayed here */}
      </div>
    </div>
  );
};

export default Profile;
