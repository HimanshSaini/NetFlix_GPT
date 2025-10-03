import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addPopularMovies } from '../utils/moviesSlice';

const usePopularMovies = () => {
    const dispatch = useDispatch(); 
    const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies); 
    // Logic to fetch and return now playing movies

    const getPopularMovies = async () => {
      const data = await fetch(
      'https://api.themoviedb.org/3/movie/popular?page=1', 
      API_OPTIONS
      );
      const json = await data.json();
      //console.log("json data", json.results);
      dispatch(addPopularMovies(json.results));
    }

  useEffect(() => {
  !nowPlayingMovies &&  getPopularMovies();
  }, []);
}

export default usePopularMovies;