import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  //console.log(movies);

  return (
    <div className='p-6 z-40'>
      <h1 className='md:text-3xl text-2xl font-bold py-6 text-white'>{title}</h1>
      <div
        className="flex overflow-x-auto"
        style={{
          scrollbarWidth: "none",       // Firefox
          msOverflowStyle: "none",      // IE and Edge
        }}
      >
        <div
          className="flex"
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          {movies?.map((movie) => (
            <MovieCard
              key={movie?.id}
              id={movie?.id}
              posterPath={movie?.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
