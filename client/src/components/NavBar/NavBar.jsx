import React, { useEffect, useState } from "react";
import {normalUrl} from "../../components/paths/path_url"
import axios from "axios";
import { isAuthenticated, isAuthUser } from "../../redux/auth/action";
import "../all.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllMovies } from "../../redux/movie/action";

export const NavBar = () => {
  const isAuth = useSelector((store) => store.user.isAuth);
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    axios.get(`${normalUrl}/user/logout`).then((res) => {
      dispatch(isAuthUser(false));
      dispatch(getAllMovies([]));
    });
  };
  useEffect(() => {}, [isAuth]);
  return (
    <>
      <nav>
        <button onClick={() => {navigate("/"), location.reload();}}><h1>Netprime</h1></button>
        <ul>
          <li>
            {isAuth && (
              <button style={{ fontWeight: "bold", fontSize: "16px" }} onClick={() => navigate("/search")}><img src="https://img.icons8.com/bubbles/344/google-web-search.png" width="40" height="40"/></button>
            )}
          </li>
          <li>
            {!isAuth ? (
              <>
                <button onClick={() => navigate("/login")}><h2>Login</h2></button>
              </>
            ) : (
              <>
                {/* <button onClick={() => navigate("/addmovie")}>Add Movie</button> */}
               
                  {/* <h4 style={{ color: "white" }}>
                    <h4>Hello</h4>, {user.data?.username}
                  </h4> */}
                  
                  <button onClick={() => {navigate("/"), location.reload()}} >
                    <img src="https://img.icons8.com/bubbles/344/user.png" alt="" width="40" height="40"/>
                  </button>
                
              </>
            )}
          </li>
          <li>
            {isAuth ? (
              ""
            ) : (
              <button onClick={() => navigate("/register")}><h2>Register</h2></button>
            )}
          </li>
          <li>
            {isAuth ? (
              <>
                <button
                  onClick={() => {
                    logout();
                  }}
                >
                <img src="https://img.icons8.com/clouds/344/exit.png" width="40" height="40"/>
                </button>
              </>
            ) : (
              ""
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};
