import React, { useEffect, useState } from "react";
import SearchMovie from "./SearchMovie";
import FavoriteMovie from "./FavoriteMovie";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ReactLoading from "react-loading";

import { addDataMovies, getDataMovies } from "../firebase";

function MoviesApp({ userId }) {
  const [moviesId, setMoviesId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (moviesId.length > 0) {
      addDataMovies(userId, moviesId);
    }
  }, [moviesId, userId]);

  useEffect(() => {
    getDataMovies(userId).then((data) => {
      setMoviesId(data);
      setIsLoading(false);
    });
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
    <CSSTransition key={movieId} classNames="favoriteMovieTransition" timeout={500} unmountOnExit>
      <FavoriteMovie movieId={movieId} removeMovie={removeMovie} />
    </CSSTransition>
  ));

  return (
    <div className="moviesApp_page">
      <div className="moviesApp_container">
        <SearchMovie addMovie={addMovie} removeMovie={removeMovie} moviesId={moviesId} />
        <h1 className="moviesApp_title">Mes Films</h1>
        {isLoading ? (
          <div className="loader">
            <ReactLoading width={"20rem"} height={"20rem"} type={"spinningBubbles"} color={"#1e3d59"} />
          </div>
        ) : (
          <React.Fragment>
            {displayMovies.length > 0 ? (
              <div className="favoriteMovies_container">
                <TransitionGroup component={null}>{displayMovies}</TransitionGroup>
              </div>
            ) : (
              <p className="favoriteMovies_none">Vous n'avez actuellement aucun film ajouté</p>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default MoviesApp;
