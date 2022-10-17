import { useState, useEffect } from "react";
import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMoviesData,
  getSearchedMovieData,
  getPopularMovies,
  popularAllMovies,
} from "../../redux/movie/action";
import "../all.css";

const Search = () => {
  const [searchedMovie, setSearchedMovie] = useState("");

  const isAuth = useSelector((store) => store.user.isAuth);

  const { movies, loading, searchmovies } = useSelector((store) => store.movies);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getMoviesData = () => {
    dispatch(getAllMoviesData());
  };

  const popularMoviesData = () => {
    dispatch(getPopularMovies());
  };
  const handleChange = (e) => {
    if(e.target.value === ""){
      return;
    }
    setSearchedMovie(e.target.value);
  };
  
  const searchedMovieData = () => {
    
    if(searchedMovie=== ""){
      location.reload();
      return;
    }
    dispatch(getSearchedMovieData(searchedMovie));
  };
  
  useEffect(() => {
    getMoviesData();
    popularMoviesData();
  }, []);
 

  return loading ? (
    <>
      <h3 className="loading">Loading...</h3>
    </>
  ) : (
    <div>
      <div className="search-bar-container">
        {isAuth && movies.length > 0 &&(
          <div className="search-bar">
            <input type="text" onChange={handleChange} />
            <button onClick={searchedMovieData}>Search Movie</button>
          </div>
        )}
      </div>
      <div className="movie-card-container" >
      {isAuth && <h4>SEARCH MOVIES</h4>}
        {movies !== undefined
          ? movies.map((e, i) => {
              return (
                <div className="movie-card" key={e.id}>
                  <div className="movie-image">
                    <img src={e.image_url} alt="" />
                  </div>
                  <div className="movie-name">Movie Name: {e.moviename}</div>
                  <div className="movie-year">Year: {e.year}</div>
                  <div className="movie-imdb">IMDb Rating: {e.imdb}</div>
                  <div className="movie-genre">Genre: {e.genre}</div>
                  <div className="movie-director">Director: {e.director}</div>
                  <form action={e.youtube_url}>
                    <button type="submit">Play</button>
                  </form>
                </div>
                
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Search;

