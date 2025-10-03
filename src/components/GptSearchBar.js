import { useSelector, useDispatch } from "react-redux";
import lang from "../utils/languageConstant";
import { useRef } from "react";
import OpenAI from "openai";
import { API_OPTIONS } from "../utils/constants";
import { addGPTMovieResult, setLoading } from "../utils/gptSlice";

const HF_API_KEY = process.env.REACT_APP_HF_TOKEN;

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: HF_API_KEY,
  dangerouslyAllowBrowser: true,
});

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.gpt.loading);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGPTSearchClick = async () => {
    const queryText = searchText.current.value.trim();
    if (!queryText) return;

    const query = `Act as a movie recommendation system and suggest some movies for the query: ${queryText}. Only give me the names of 10 movies, comma-separated like: Sholay, Shabnam, Golmal, Gadar, OMG2`;

    dispatch(setLoading(true));

    try {
      const chatCompletion = await client.chat.completions.create({
        model: "deepseek-ai/DeepSeek-V3.2-Exp:novita",
        messages: [{ role: "user", content: query }],
      });

      const output = chatCompletion.choices[0]?.message?.content || "";
      const movieNames = output.split(",").map((name) => name.trim()).filter(Boolean);

      const movieDetailsPromises = movieNames.map((name) => searchMovieTMDB(name));
      const movieResults = (await Promise.all(movieDetailsPromises)).filter(Boolean);

      dispatch(addGPTMovieResult({ movieNames, movieResults }));
    } catch (error) {
      console.error("HF API Error:", error);
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-[70%]" onSubmit={(e) => e.preventDefault()}>
        <h1 className="font-bold text-4xl text-white py-4">{lang[langKey].headingTitle}</h1>
        <input
          type="text"
          ref={searchText}
          className="p-2 w-[70%] ml-12 bg-gray-50 rounded-lg"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="p-2 font-bold px-6 m-2 bg-red-600 text-white rounded-lg"
          type="submit"
          onClick={handleGPTSearchClick}
          disabled={loading}
        >
          {loading ? "Searching..." : lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
