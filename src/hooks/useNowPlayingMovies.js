import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from '../utils/moviesSlice';

const useNowPlayingMovies = () => {
    const dispatch = useDispatch(); 

    // Logic to fetch and return now playing movies
    const getNowPlayingMovies = async () => {
      const data = await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?page=1', 
      API_OPTIONS
      );
      const json = await data.json();
      //console.log("json data", json.results);
      dispatch(addNowPlayingMovies(json.results));
    }

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
}

export default useNowPlayingMovies;