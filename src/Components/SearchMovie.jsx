import React, { useState, useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import MovieResult from "./MovieResult";

function SearchMovie({ addMovie, removeMovie, moviesId }) {
  const [isShowSearchMovie, setIsShowSearchMovie] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [movieSearch, setMovieSearch] = useState({
    option: "all",
    search: "",
  });
  const [resultSearch, setResultSearch] = useState({
    resultMovie: [],
    nbOfPages: null,
  });

  const refSearchMovieSection = useRef();
  const refPage = useRef();

  const handleShowSearchClick = () => {
    setIsShowSearchMovie((boolean) => !boolean);
  };

  const fetchApi = (txtSearch, nbPage) => {
    const option = movieSearch.option === "all" ? "" : `&type=${movieSearch.option}`;
    fetch(`http://www.omdbapi.com/?s=${txtSearch}&page=${nbPage}${option}&apikey=a80c0cee&`)
      .then((response) => response.json())
      .then((data) => {
        setResultSearch({ resultMovie: [...data.Search], nbOfPages: Math.ceil(data.totalResults / 10) });
        setShowErrorMessage(false);
      })
      .catch(() => setShowErrorMessage(true));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchApi(movieSearch.search, 1);
  };

  const handleChangePageClick = (e, page) => {
    refPage.current.classList.remove("searchMovie_page-selected");
    refPage.current = e.target;
    refPage.current.classList.add("searchMovie_page-selected");
    fetchApi(movieSearch.search, page);
  };

  const handleRadioChange = (e) => {
    setMovieSearch({ ...movieSearch, option: e.target.value });
  };

  useEffect(() => {
    if (isShowSearchMovie) {
      const height = refSearchMovieSection.current.scrollHeight;
      refSearchMovieSection.current.style.height = `${height}px`;
    } else {
      refSearchMovieSection.current.style.height = `0px`;
    }
  }, [resultSearch, isShowSearchMovie]);

  let displayResultMovies = null;
  if (resultSearch.resultMovie) {
    displayResultMovies = resultSearch.resultMovie.map((result, index) => {
      //check si le résultat est deja ajouter
      const isAdd = moviesId.includes(result.imdbID);
      return (
        <MovieResult data={result} key={index} addMovie={addMovie} removeMovie={removeMovie} isAdd={isAdd} />
      );
    });
  }

  //Gere la gestion des éventuelles page si les résultats dépasse 10
  let tabResultPages = [];
  let displayResultPages;
  if (resultSearch.nbOfPages > 1) {
    for (let i = 1; i <= resultSearch.nbOfPages; i++) {
      tabResultPages.push(i);
    }
    displayResultPages = tabResultPages.map((page) => {
      if (page === 1) {
        return (
          <span
            className="searchMovie_page searchMovie_page-selected"
            onClick={(e) => handleChangePageClick(e, page)}
            key={page}
            ref={refPage}
          >
            {page}
          </span>
        );
      } else {
        return (
          <span className="searchMovie_page" onClick={(e) => handleChangePageClick(e, page)} key={page}>
            {page}
          </span>
        );
      }
    });
  }

  let classNameIcon = "searchMovie_header_icon";
  classNameIcon += isShowSearchMovie ? " searchMovie_header_icon-close" : "";

  return (
    <div className="searchMovie_container">
      <div className="searchMovie_header" onClick={handleShowSearchClick}>
        <h1 className="searchMovie_header_title">Trouver un film</h1>
        <div className={classNameIcon}>
          <IoClose />
        </div>
      </div>
      <div className="searchMovie_section" ref={refSearchMovieSection}>
        <form className="searchMovie_form" onSubmit={handleSubmit}>
          <hr className="searchMovie_form_hr" />
          <div className="searchMovie_radio">
            <p>Sélectionner un type :</p>
            <label htmlFor="all">All</label>
            <input
              type="radio"
              id="all"
              name="type"
              value="all"
              checked={movieSearch.option === "all"}
              onChange={handleRadioChange}
            />
            <label htmlFor="movie">Movie</label>
            <input
              type="radio"
              id="movie"
              name="type"
              value="movie"
              checked={movieSearch.option === "movie"}
              onChange={handleRadioChange}
            />
            <label htmlFor="series">Serie</label>
            <input
              type="radio"
              id="series"
              name="type"
              value="series"
              checked={movieSearch.option === "series"}
              onChange={handleRadioChange}
            />
          </div>
          <p className="searchMovie_errorMessage">
            {showErrorMessage && "Veuillez entrer un titre suffisamment explicite"}
          </p>
          <input
            className="searchMovie_search"
            type="text"
            id="newovie"
            value={movieSearch.search}
            name="todo"
            onChange={(e) => setMovieSearch({ ...movieSearch, search: e.target.value })}
          />

          <button className="searchMovie_btn" type="submit">
            Rechercher
          </button>
        </form>
        <div className="searchMovie_result">{displayResultMovies}</div>
        <div className="searchMovie_pages">{displayResultPages}</div>
      </div>
    </div>
  );
}

export default SearchMovie;
