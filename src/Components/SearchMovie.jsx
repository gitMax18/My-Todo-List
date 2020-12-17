import React, { useState, useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import MovieResult from "./MovieResult";

function SearchMovie({ addMovie, removeMovie }) {
  const [isShowSearchMovie, setIsShowSearchMovie] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [movieSearch, setMovieSearch] = useState("");
  const [resultSearch, setResultSearch] = useState([]);

  const refSearchMovieSection = useRef();

  const handleClick = () => {
    setIsShowSearchMovie((boolean) => !boolean);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?s=${movieSearch}&type=movie&apikey=a80c0cee&`)
      .then((response) => response.json())
      .then((data) => {
        setResultSearch([...data.Search]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isShowSearchMovie) {
      const height = refSearchMovieSection.current.scrollHeight;
      refSearchMovieSection.current.style.height = `${height}px`;
    } else {
      refSearchMovieSection.current.style.height = `0px`;
    }
  }, [resultSearch, isShowSearchMovie]);

  let displayResult = null;
  if (resultSearch) {
    displayResult = resultSearch.map((result) => {
      return <MovieResult data={result} key={result.imdbID} addMovie={addMovie} removeMovie={removeMovie} />;
    });
  }

  let classNameIcon = "searchMovie_header_icon";
  classNameIcon += isShowSearchMovie ? " searchMovie_header_icon-close" : "";

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
          <hr className="searchMovie_form_hr" />
          <span className="searchMovie_errorMessage">{showErrorMessage && "Veuillez entrer votre film"}</span>
          <input
            className="searchMovie_input"
            type="text"
            id="newovie"
            value={movieSearch}
            name="todo"
            onChange={(e) => setMovieSearch(e.target.value)}
          />

          <button className="searchMovie_btn" type="submit">
            Rechercher
          </button>
        </form>
        <div className="searchMovie_result">{displayResult}</div>
      </div>
    </div>
  );
}

export default SearchMovie;
