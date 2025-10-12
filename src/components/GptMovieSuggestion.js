import MovieList from './MovieList';
import { useSelector } from 'react-redux';
import { ShimmerMovieCard } from '../utils/ShimmerUI';

const GptMovieSuggestion = () => {
  const { movieResults, movieNames, loading } = useSelector((store) => store?.gpt);

  if (loading) {
    return <ShimmerMovieCard count={movieNames?.length || 5} />;
  }

if (!movieNames || movieNames.length === 0) {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-black/40 pt-32">
      <h1 className="text-white text-3xl md:text-4xl font-semibold px-6 py-4 bg-black/50 rounded-2xl shadow-lg backdrop-blur-sm">
        🎬 What will watch <span className="italic text-red-600">You</span> today?
      </h1>
    </div>
  );
}

  return (
    <div className="z-40 p-4 relative md:mt-[50px] bg-black bg-opacity-80 rounded-lg">
      {movieNames.map((movieName, index) => (
        <div key={movieName} className="mb-8">
          <h2 className="text-white font-bold text-xl mb-2">{movieName}</h2>
          <MovieList movies={movieResults[index] || []} />
        </div>
      ))}
    </div>
  );
};

export default GptMovieSuggestion;
