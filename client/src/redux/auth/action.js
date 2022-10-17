import axios from "axios";
import {normalUrl} from "../../components/paths/path_url"
export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const ISAUTH = "ISAUTH";

export const LOGIN_USER_LOADING = "LOGIN_USER_LOADING";

export const loginUser = (user) => ({ type: LOGIN_USER, payload: user });
export const loginUserLoading = () => ({ type: LOGIN_USER });
export const isAuthUser = (isAuth) => ({ type: ISAUTH, payload: isAuth });

export const loginUserData = (details) => (dispatch) => {
  axios
    .post(`${normalUrl}/user/login`, details)
    .then(({ data }) => {
      localStorage.setItem("user", data.username);
      dispatch(loginUser(data));
      if (data.message === "Login Successfull") {
        dispatch(isAuthUser(true));
      } else {
        dispatch(isAuthUser(false));
      }
      alert(`${data.message}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const registerUserData = (details) => (dispatch) => {
  axios
    .post(`${normalUrl}/user/register`, details)
    .then((res) => {
      console.log("Register user", res);
      dispatch(loginUser(res.data.user));
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const isAuthenticated = () => (dispatch) => {
  try {
    axios.get(`${normalUrl}/user/isAuth`).then(({ data }) => {
      if (data.message === "Authenticated") {
        dispatch(isAuthUser(true));
      } else {
        dispatch(isAuthUser(false));
      }
    });
  } catch (error) {
    console.log("Error: " + error.message);
  }
};
