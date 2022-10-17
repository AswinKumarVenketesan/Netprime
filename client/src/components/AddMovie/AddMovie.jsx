import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../all.css";
import { useDispatch } from "react-redux";
import { addMovieData } from "../../redux/movie/action";

export const AddMovie = () => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    moviename: "",
    year: "",
    imdb: "",
    genre: "",
    director: "",
    image_url: "",
    youtube_url: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setDetails({
      ...details,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(addMovieData(details));
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  return (
    <div className="container">
      <h1>Add Movie</h1>
      <div className="form">
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            id="moviename"
            name="moviename"
            placeholder="Movie Name"
            onChange={handleChange}
            required
          />
          <input
            type="year"
            id="year"
            name="year"
            placeholder="Year"
            onChange={handleChange}
            required
          />
          <input
            type="float"
            id="imdb"
            name="imdb"
            placeholder="Imdb"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="genre"
            name="genre"
            placeholder="Genre"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="director"
            name="director"
            placeholder="Director"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="image_url"
            name="image_url"
            placeholder="Image URL"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            id="youtube_url"
            name="youtube_url"
            placeholder="Youtube URL"
            onChange={handleChange}
            required
          />
          <input className="submit-btn" type="submit" />
        </form>
      </div>
    </div>
  );
};
