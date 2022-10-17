import {
  ADD_MOVIE,
  DELETE_MOVIE,
  GET_ALL_MOVIES,
  SEARCH_ALL_Movies,
  GET_ONE_MOVIE,
  GET_SEARCHED_MOVIE,
  MOVIES_LOADING,
  UPDATE_MOVIES,
  THRILLER_ALL_Movies,
  ROMANCE_ALL_Movies
} from "./action";

const initState = {
  movies: [],
  loading: false,
};

export const movieReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case GET_ONE_MOVIE:
    case GET_ALL_MOVIES:
    case GET_SEARCHED_MOVIE:
      return { ...store, movies: payload, loading: false };
    case SEARCH_ALL_Movies:
      return{ ...store, searchmovies:payload, loading: false};
    case THRILLER_ALL_Movies:
      return{ ...store, thrillermovies:payload, loading: false};
    case ROMANCE_ALL_Movies:
      return{ ...store, romancemovies:payload, loading: false};
    case ADD_MOVIE:
      return { ...store, movies: payload, loading: false };
    case MOVIES_LOADING:
    case UPDATE_MOVIES:
    case DELETE_MOVIE:
      return { ...store, loading: true };
    default:
      return { ...store, loading: false };
  }
};
