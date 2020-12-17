import React, { useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import MovieResult from "./MovieResult";

function SearchMovie({ addMovie, removeMovie }) {
  const [isShowSearchMovie, setIsShowSearchMovie] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [movieSearch, setMovieSearch] = useState("");
  const [resultSearch, setResultSearch] = useState([]);

  const refSearchMovieSection = useRef();

  const handleClick = () => {
    if (isShowSearchMovie) {
      const height = refSearchMovieSection.current.scrollHeight + 15;
      refSearchMovieSection.current.style.height = `${height}px`;
    } else {
      refSearchMovieSection.current.style.height = `0px`;
    }
    setIsShowSearchMovie((boolean) => !boolean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?s=${movieSearch}&type=movie&apikey=a80c0cee&`)
      .then((response) => response.json())
      .then((data) => {
        setResultSearch([...data.Search]);
        console.log(resultSearch);
      })
      .catch((err) => console.log(err));
  };

  let displayResult;

  if (resultSearch) {
    displayResult = resultSearch.map((result) => (
      <MovieResult data={result} key={result.imdbID} addMovie={addMovie} removeMovie={removeMovie} />
    ));
  }

  let classNameIcon = "searchMovie_header_icon";
  classNameIcon += !isShowSearchMovie ? " searchMovie_header_icon-close" : "";

  return (
    <div className="searchMovie_container">
      <div className="searchMovie_header" onClick={handleClick}>
        <h1 className="searchMovie_header_title">Trouver un film</h1>
        <div className={classNameIcon}>
          <IoClose />
        </div>
      </div>
      <div className="searchMovie_section" ref={refSearchMovieSection}>
        <form className="searchMovie_form" onSubmit={handleSubmit}>
          <div className="searchMovie_inputs">
            <hr className="searchMovie_form_hr" />
            <label htmlFor="newMovie">Film : </label>
            <span className="searchMovie_errorMessage">
              {showErrorMessage && "Veuillez entrer votre film"}
            </span>
            <input
              type="text"
              id="newovie"
              value={movieSearch}
              name="todo"
              onChange={(e) => setMovieSearch(e.target.value)}
            />
          </div>
          <button className="createTodo_btn" type="submit">
            Rechercher
          </button>
        </form>
        <div className="searchMovie_result">{displayResult}</div>
      </div>
    </div>
  );
}

export default SearchMovie;
