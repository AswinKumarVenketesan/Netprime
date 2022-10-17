import axios from "axios";
import {normalUrl} from "../../components/paths/path_url"
export const ADD_MOVIE = "ADD_MOVIE";
export const GET_ONE_MOVIE = "ADD_MOVIE";
export const GET_ALL_MOVIES = "ADD_MOVIES";
export const SEARCH_ALL_Movies = "SEARCH_MOVIES";
export const THRILLER_ALL_Movies = "THRILLER_MOVIES";
export const ROMANCE_ALL_Movies = "ROMANCE_MOVIES";
export const UPDATE_MOVIES = "UPDATE_MOVIES";
export const DELETE_MOVIE = "DELETE_MOVIES";
export const GET_SEARCHED_MOVIE = "GET_SEARCHED_MOVIE";

export const MOVIES_LOADING = "MOVIES_LOADING";

export const addMovie = (movies) => ({ type: ADD_MOVIE, payload: movies });
export const getOneMovie = (movies) => ({
  type: GET_ONE_MOVIE,
  payload: movies,
});
export const getAllMovies = (movies) => ({
  type: GET_ALL_MOVIES,
  payload: movies,
});
export const popularAllMovies = (searchmovies) => ({
  type: SEARCH_ALL_Movies,
  payload: searchmovies,
});
export const thrillerAllMovies = (thrillermovies) => ({
  type: THRILLER_ALL_Movies,
  payload: thrillermovies,
});
export const romanceAllMovies = (romancemovies) => ({
  type: ROMANCE_ALL_Movies,
  payload: romancemovies,
});
export const getSearchedMovies = (movies) => ({
  type: GET_SEARCHED_MOVIE,
  payload: movies,
});
export const deleteMovies = () => ({ type: DELETE_MOVIE });
export const moviesLoading = () => ({ type: MOVIES_LOADING });

export const addMovieData = (details) => (dispatch) => {
  dispatch(moviesLoading());
  axios
    .post(path_url/movie/create, details)
    .then(({ data }) => {
      dispatch(addMovie(data));
      dispatch(getAllMoviesData());
      // dispatch(getAllMovies(data.movies));
      alert(`${data.message}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const getAllMoviesData = () => (dispatch) => {
  dispatch(moviesLoading());
  axios
    .get(`${normalUrl}/movie/getAll`)
    .then(({ data }) => {
      dispatch(getAllMovies([...data.movies]));
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const getPopularMovies = () => (dispatch) => {
  dispatch(moviesLoading());
  axios
    .get(`${normalUrl}/movie/popularmovies`)
    .then(({ data }) => {
      dispatch(popularAllMovies([...data.searchmovies]));
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const getThrillerMovies = () => (dispatch) => {
  dispatch(moviesLoading());
  axios
    .get(`${normalUrl}/movie/genre/thriller`)
    .then(({ data }) => {
      dispatch(thrillerAllMovies([...data.thrillermovies]));
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const getRomanceMovies = () => (dispatch) => {
  dispatch(moviesLoading());
  axios
    .get(`${normalUrl}/movie/genre/romance`)
    .then(({ data }) => {
      dispatch(romanceAllMovies([...data.romancemovies]));
    })
    .catch((err) => {
      console.log(err.message);
    });
};


export const getOneMovieData = (id) => (dispatch) => {
  axios
    .get(`${normalUrl}/movie/getOne/${id}`)
    .then(({ data }) => {
      dispatch(getOneMovie(data));
      alert(`${data.message}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const getSearchedMovieData = (moviename) => (dispatch) => {
  // dispatch(moviesLoading());
  axios
    .get(`${normalUrl}/movie/${moviename}`)
    .then(({ data }) => {
      console.log("SearchedMovies from redux", data);
      let SearchedMovies = [];
      for (let i = 0; i < data.length; i++) {
        console.log(data, "l");
        SearchedMovies.push(data[i]);
      }
      if(SearchedMovies.length===0){
        alert("No movies were found");
        dispatch(getAllMoviesData());
      }
      console.log("SearchedMovies", SearchedMovies);
      dispatch(getAllMovies([...SearchedMovies]));
    })
    .catch((err) => {
      

      console.log("Error in searching movies", err.message);
    });
};

export const updateMovieData = (id) => (dispatch) => {
  axios
    .patch(`${normalUrl}/movie/update/${id}`)
    .then(({ data }) => {
      dispatch(getAllMovies(data));
      dispatch(getAllMoviesData());
      alert(`${data.message}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const deleteMovieData = (id) => (dispatch) => {
  axios
    .delete(`${normalUrl}/movie/update/${id}`)
    .then(({ data }) => {
      dispatch(deleteMovies());
      dispatch(getAllMoviesData());
      alert(`${data.message}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
