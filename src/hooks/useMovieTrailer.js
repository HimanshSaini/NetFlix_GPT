import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice"; 

const useMovieTrailer = (movieId) => {
    
    const dispatch = useDispatch();
    const trailerVideo = useSelector((store) => store.movies.trailerVideo);

    const getMovieVideo = async () => {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/videos`, 
            API_OPTIONS
        );
        const json = await res.json();
        //console.log("video data", json);

        const filterdata = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterdata.length ? filterdata[0] : json.results[0];
        //console.log("Trailer", trailer);

        dispatch(addTrailerVideo(trailer));
        }

        useEffect(() => {
         !trailerVideo && getMovieVideo();
        }, []);
}

export default useMovieTrailer;