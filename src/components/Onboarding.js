import { Link } from "react-router-dom";

const Onboarding = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto p-8 flex flex-col items-center">
        <h2 className="text-2xl text-red-500 mb-4">Discover FlixyAI</h2>
        <h1 className="text-3xl md:text-5xl font-semibold text-center">
          Explore, Track, and Get Movie Recommendations
        </h1>
        <p className="mt-6 text-center w-3/4 md:w-1/2">
          FlixyAI is your personal movie companion. Explore top-rated movies, add them to your bucket list, get personalized recommendations, and enjoy the magic of cinema.
        </p>
        <div className="mt-10">
          <Link 
            to="/login" 
            className="py-2 px-4 bg-red-700 text-white rounded hover:bg-red-800 transition"
          >
            Login / Sign Up
          </Link>
        </div>
      </div>
      {/* Additional onboarding content or sections can be added here */}
    </div>
  );
};

export default Onboarding;
