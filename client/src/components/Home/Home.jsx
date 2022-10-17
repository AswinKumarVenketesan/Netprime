import { useState, useEffect } from "react";
import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMoviesData,
  getSearchedMovieData,
  getPopularMovies,
  popularAllMovies,
  getThrillerMovies,
  getRomanceMovies,
} from "../../redux/movie/action";
import "../all.css";

const Home = () => {
  const [searchedMovie, setSearchedMovie] = useState("");

  const isAuth = useSelector((store) => store.user.isAuth);

  const { movies, loading, searchmovies, thrillermovies, romancemovies } = useSelector((store) => store.movies);
  // const { searchmovies } = useSelector((store) => store.searchmovies);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getMoviesData = () => {
    dispatch(getAllMoviesData());
  };

  const popularMoviesData = () => {
    dispatch(getPopularMovies());
  };

  const thrillerMoviesData = () => {
    dispatch(getThrillerMovies());
  };

  const romanceMoviesData = () => {
    dispatch(getRomanceMovies());
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
    popularMoviesData();
    getMoviesData();
    romanceMoviesData(); 
    thrillerMoviesData();
  }, []);
  
  window.onscroll = function (ev) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
      setPage(page + 1);
    }
  }

  return loading ? (
    <>
      <h3 className="loading">Loading...</h3>
    </>
  ) : (
    <div>
      <div className="search-bar-container">
        {!isAuth && <h2>Welcome to Netprime</h2>}
        {!isAuth && <h3>Watch unlimited movies</h3>}
        {isAuth && movies.length > 0 &&(
          <div className="search-bar">
            {/* <input type="text" onChange={handleChange} /> */}
            {/* <button onClick={() => navigate("/search")}>Search Movie</button> */}
            {/* {isAuth &&} */}
          </div>
        )}
      </div>
      <div className="movie-card-container">
      {isAuth && <h4>TOP 10 HIGHEST RATED MOVIES</h4>}
        {isAuth && searchmovies !== undefined
          ? searchmovies.map((e, i) => {
              return (
                <div className="movie-card" key={e.id}>
                  <div className="movie-image">
                    <img src={e.image_url} alt="" />
                  </div>
                  <div className="movie-details">
                  <div className="movie"><p>{e.moviename}</p> <form action={e.youtube_url}>
                    <button type="submit">Play</button>
                  </form></div>                
                  </div>
                </div>
                
              );
            })
          : ""}
      </div>

      <div className="movie-card-container">
      {isAuth && <h4>MOVIES</h4>}
        {isAuth && movies !== undefined
          ? movies.map((e, i) => {
              return (
                <div className="movie-card" key={e.id}>
                  <div className="movie-image">
                    <img src={e.image_url} alt="" />
                  </div>
                  <div className="movie-details">
                  <div className="movie"><p>{e.moviename} <form action={e.youtube_url}>
                    <button type="submit">Play</button>
                  </form></p></div>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
      
      <div className="movie-card-container">
      {isAuth && <h4>ROMANCE MOVIES</h4>}
        {isAuth && romancemovies !== undefined
          ? romancemovies.map((e, i) => {
              return (
                <div className="movie-card" key={e.id}>
                  <div className="movie-image">
                    <img src={e.image_url} alt="" />
                  </div>
                  <div className="movie-details">
                  <div className="movie"><p>{e.moviename} <form action={e.youtube_url}>
                    <button type="submit">Play</button>
                  </form></p></div>
                  </div>
                </div>
                
              );
            })
          : ""}
      </div>
      <div className="movie-card-container">
      {isAuth && <h4>THRILLER MOVIES</h4>}
        {isAuth && thrillermovies !== undefined
          ? thrillermovies.map((e, i) => {
              return (
                <div className="movie-card" key={e.id}>
                  <div className="movie-image">
                    <img src={e.image_url} alt="" />
                  </div>
                  <div className="movie-details">
                  <div className="movie"><p>{e.moviename} <form action={e.youtube_url}>
                    <button type="submit">Play</button>
                  </form></p></div>
                  </div>
                </div>
                
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default Home;
