import MovieList from './MovieList';
import { useSelector } from 'react-redux';
import { ShimmerMovieCard } from '../utils/ShimmerUI';

const GptMovieSuggestion = () => {
  const { movieResults, movieNames, loading } = useSelector((store) => store?.gpt);

  if (loading) {
    return <ShimmerMovieCard count={movieNames?.length || 5} />;
  }

  if (!movieNames || movieNames.length === 0) {
    return <h1 className="text-red-500">No movie suggestions available</h1>;
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
