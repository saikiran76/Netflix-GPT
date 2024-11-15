const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-[92vw] h-[115vh] aspect-video pt-[25%] sm:pt-[18%] md:pt-[12%]  px-6 md:px-24 mb-8 md:mb-5 absolute text-white bg-gradient-to-r from-black font-martelsans">
      <p className="mb-4 text-[#FED86D]">Witness the new feature dropped. Get your movie recommendations.</p>
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-3 w-2/4 text-md">{overview}</p>
      
      <div className="my-4 md:m-0 mb-5">
        <button className=" bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl  rounded-lg hover:bg-opacity-80">
           Play
        </button>
        <button className="hidden md:inline-block mx-2  bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;
