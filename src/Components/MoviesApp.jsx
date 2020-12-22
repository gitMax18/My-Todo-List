import React, { useEffect, useState } from "react";
import SearchMovie from "./SearchMovie";
import FavoriteMovie from "./FavoriteMovie";

import { addDataMovies, getDataMovies } from "../firebase";

function MoviesApp({ userId }) {
  const [moviesId, setMoviesId] = useState([]);

  useEffect(() => {
    if (moviesId.length > 0) {
      addDataMovies(userId, moviesId);
    }
  }, [moviesId, userId]);

  useEffect(() => {
    getDataMovies(userId)
      .then((data) => setMoviesId(data))
      .catch((err) => console.log(err));
  }, [userId]);

  const addMovie = (movieId) => {
    setMoviesId([...moviesId, movieId]);
  };

  const removeMovie = (movieId) => {
    console.log(movieId);
    let newMovies = [...moviesId];
    newMovies = moviesId.filter((movie) => {
      return movie !== movieId;
    });
    setMoviesId(newMovies);
  };

  const displayMovies = moviesId.map((movieId) => (
    <FavoriteMovie movieId={movieId} key={movieId} removeMovie={removeMovie} />
  ));

  return (
    <div className="moviesApp_page">
      <div className="moviesApp_container">
        <SearchMovie addMovie={addMovie} removeMovie={removeMovie} moviesId={moviesId} />
        <h1 className="moviesApp_title">Mes Films</h1>

        {displayMovies.length > 0 ? (
          <div className="favoriteMovies_container">{displayMovies}</div>
        ) : (
          <p className="favoriteMovies_none">Vous n'avez actuellement aucun film ajouté</p>
        )}
      </div>
    </div>
  );
}

export default MoviesApp;
