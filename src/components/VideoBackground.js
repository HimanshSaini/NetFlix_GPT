import useMovieTrailer from "../hooks/useMovieTrailer";
import { useSelector } from "react-redux";

const VideoBackground = ({movieId}) => {

    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
    useMovieTrailer(movieId);

    return (
    <div className="w-screen aspect-video">
        <iframe
          width='100%'
          height='100%'
          src={"https://www.youtube.com/embed/" + trailerVideo?.key+"?&mute=1"}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen></iframe>
      </div>
    )
};

export default VideoBackground;
