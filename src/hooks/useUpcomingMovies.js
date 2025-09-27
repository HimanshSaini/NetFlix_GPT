import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUpcomingMovies } from '../utils/moviesSlice';

const useUpcomingMovies  = () => {
    const dispatch = useDispatch(); 
    // Logic to fetch and return now playing movies

    const getUpcomingMovies  = async () => {
      const data = await fetch(
      'https://api.themoviedb.org/3/movie/upcoming?page=1', 
      API_OPTIONS
      );
      const json = await data.json();
      //console.log("json data", json.results);
      dispatch(addUpcomingMovies (json.results));
    }

  useEffect(() => {
    getUpcomingMovies ();
  }, []);
}

export default useUpcomingMovies ;