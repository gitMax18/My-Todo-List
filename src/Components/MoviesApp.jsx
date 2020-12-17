import React, { useState } from "react";
import SearchMovie from "./SearchMovie";
import Movies from "./Movies";

function MoviesApp() {
  const [movies, setMovies] = useState([]);

  const addMovie = (movieId) => {
    setMovies([...movies, movieId]);
  };

  const removeMovie = (movieId) => {
    let newMovies = [...movies];
    newMovies = movies.filter((movie) => {
      return movie !== movieId;
    });
    setMovies(newMovies);
  };

  return (
    <div className="todosApp_page">
      <div className="todosApp_container">
        <SearchMovie addMovie={addMovie} removeMovie={removeMovie} />
        <h1 className="todosApp_title">Mes Films</h1>
        <Movies />
      </div>
    </div>
  );
}

export default MoviesApp;
