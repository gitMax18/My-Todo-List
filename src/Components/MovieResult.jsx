import React, { useState } from "react";

function MovieResult({ data, addMovie, removeMovie, isAdd }) {
  const [isFavorite, setIsFavorite] = useState(isAdd);

  const { Title, Year, imdbID, Type, Poster } = data;

  const handleClick = () => {
    if (isFavorite) {
      removeMovie(imdbID);
    } else {
      addMovie(imdbID);
    }
    setIsFavorite((fav) => !fav);
  };

  return (
    <div className="movieResult_container">
      <div className="movieResult_img">
        {Poster !== "N/A" ? (
          <img src={Poster} alt="film poster" />
        ) : (
          <p className="movieResult_undefineImg">
            Image
            <br /> indisponible
          </p>
        )}
      </div>
      <div className="movieResult_infos">
        <h4>{Title}</h4>
        <p>
          {Year} / {Type}
        </p>
        <button className="movieResult_btn" onClick={handleClick}>
          {isFavorite ? "Retirer" : "Ajouter"}
        </button>
      </div>
    </div>
  );
}

export default MovieResult;
