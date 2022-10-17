import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import { Login } from "../components/Auth/Login.jsx";
import { Register } from "../components/Auth/Register.jsx";
import Home from "../components/Home/Home.jsx";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "../components/NavBar/NavBar.jsx";
import { AddMovie } from "../components/AddMovie/AddMovie.jsx";
import  Search  from "../components/Search/Search.jsx";
import AllMovies from "../components/Allmovies/Allmovies.js";
// import Genre from "../components/genre/Genre.jsx";

const AllRoutes = () => {
  const isAuth = useSelector((store) => store.user.isAuth);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element = {<Search/>}></Route>
        {/* <Route path="/allmovie" element = {<AllMovies/>}></Route> */}

        {!isAuth && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
        {isAuth ? (
          <>
            <Route path="/admin/addmovie" element={<AddMovie />} />
          </>
        ) : (
          <Route exact path="*" element={<Navigate to={"/"} />} />
        )}
        <Route exact path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
