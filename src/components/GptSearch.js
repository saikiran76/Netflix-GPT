// import { BG_URL } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GPTSearch = () => {
  return (
    <>
      <div className="gpt fixed -z-10 inset-x-0 bottom-0 rounded-md m-0">
        {/* <img className="h-screen object-cover" src={BG_URL} alt="logo" /> */}
      </div>
      <div className="rounded-md bg-black">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
};
export default GPTSearch;
