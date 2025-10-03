import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addTopRatedMovies } from '../utils/moviesSlice';

const useTopRatedMovies = () => {
    const dispatch = useDispatch(); 
    const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies); 
    // Logic to fetch and return now playing movies

    const getTopRatedMovies = async () => {
      const data = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?page=1', 
      API_OPTIONS
      );
      const json = await data.json();
      //console.log("json data", json.results);
      dispatch(addTopRatedMovies(json.results));
    }

  useEffect(() => {
   !nowPlayingMovies && getTopRatedMovies();
  }, []);
}

export default useTopRatedMovies;