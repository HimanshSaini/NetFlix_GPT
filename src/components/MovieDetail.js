import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_OPTIONS, IMG_CDN } from "../utils/constants";

const MovieDetail = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const [movieRes, videoRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
            API_OPTIONS
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
            API_OPTIONS
          ),
        ]);

        if (!movieRes.ok || !videoRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const movieJson = await movieRes.json();
        const videoJson = await videoRes.json();

        setMovie(movieJson);

        if (videoJson?.results?.length) {
          const trailer = videoJson.results.find((vid) =>
            vid.type.toLowerCase().includes("trailer")
          );
          setVideo(trailer || videoJson.results[0]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        <p className="text-xl animate-pulse">Loading movie details...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen items-center justify-center bg-black text-red-500">
        <p className="text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="ml-4 px-4 py-2 bg-teal-500 rounded hover:bg-teal-600"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="bg-black min-h-screen relative text-white">
      {/* Video Background */}
      {video && (
        <div className="fixed inset-0 z-0 overflow-hidden">
          <iframe
            className="w-full h-full object-cover opacity-50"
            src={`https://www.youtube.com/embed/${video.key}?autoplay=1&controls=0&loop=1&playlist=${video.key}`}
            title={video.name || movie?.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          <div className="absolute inset-0 bg-black opacity-20" />
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-10">
          {/* Poster */}
          <img
            className="w-64 md:w-72 border border-gray-700 rounded-xl shadow-lg self-center"
            src={IMG_CDN + movie?.poster_path}
            alt={`${movie?.title} poster`}
          />

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie?.title}</h1>
            <p className="text-gray-300 mb-6">{movie?.overview}</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
              {movie?.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full px-4 py-2 bg-gray-800 text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="text-gray-400 mb-6">
              {movie?.status} • {movie?.release_date}
            </p>

            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 font-semibold shadow-md transition"
            >
              ← Back to Movies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
