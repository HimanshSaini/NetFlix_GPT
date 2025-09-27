import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addTopRatedMovies } from '../utils/moviesSlice';

const useTopRatedMovies = () => {
    const dispatch = useDispatch(); 
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
    getTopRatedMovies();
  }, []);
}

export default useTopRatedMovies;