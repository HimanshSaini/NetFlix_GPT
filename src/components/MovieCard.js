import { IMG_CDN } from "../utils/constants";
import { Link } from "react-router-dom";

const MovieCard = ({ posterPath, id }) => {
  if (!posterPath) return null;
  if (!id) return null;
  return (
    <div className=' w-36 md:w-48   mr-4'>
      <Link to={"/browse/" + id}>
        <img
          className='rounded-xl md:hover:scale-95'
          src={IMG_CDN + posterPath}
          alt='movie poster'
        />
      </Link>
    </div>
  );
};

export default MovieCard;