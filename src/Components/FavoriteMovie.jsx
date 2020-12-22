import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiDeleteBack2Fill } from "react-icons/ri";

function FavoriteMovie({ movieId, removeMovie }) {
  const [isShowFavoriteMovie, setIsShowFavoriteMovie] = useState(false);
  const [movieData, setMovieData] = useState({});

  const { Title, Year, Runtime, Genre, Plot, Poster, Ratings = [], Type, Actors, Writer, imdbID } = movieData;
  const refContent = useRef();
  useLayoutEffect(() => {
    fetch(`http://www.omdbapi.com/?i=${movieId}&plot=full&apikey=a80c0cee&`)
      .then((response) => response.json())
      .then((data) => {
        setMovieData({ ...data });
      })
      .catch((err) => console.log(err));
  }, [movieId]);

  useEffect(() => {
    if (isShowFavoriteMovie) {
      const height = refContent.current.scrollHeight;
      refContent.current.style.height = `${height}px`;
    } else {
      refContent.current.style.height = `0px`;
    }
  }, [isShowFavoriteMovie]);

  const handleClick = () => {
    setIsShowFavoriteMovie((boolean) => !boolean);
  };

  let classNameIcon = "movie_header_icon";
  classNameIcon += isShowFavoriteMovie ? " movie_header_icon-show" : "";

  return (
    <div className="movie_container">
      <div className="movie_header">
        <div className="movie_header_delete" onClick={() => removeMovie(imdbID)}>
          <RiDeleteBack2Fill className="movie_header_deleteIcon" />
        </div>
        <div className="movie_header_right" onClick={handleClick}>
          <div className="movie_header_infos">
            <h3>{Title}</h3>
          </div>
          <div className={classNameIcon}>
            <IoClose />
          </div>
        </div>
      </div>
      <div className="movie_content" ref={refContent}>
        <div className="movie_content_img">
          {Poster !== "N/A" ? (
            <img src={Poster} alt="movie poster" />
          ) : (
            <p className="movie_undefineImg">
              Image
              <br /> indisponible
            </p>
          )}
        </div>
        <div className="movie_content_infos">
          <h4 className="movie_content_title">Synopsis :</h4>
          <p>{Plot}</p>
          <h4 className="movie_content_title">Autre infos :</h4>
          <div className="movie_content_details">
            <div>
              Année : <span>{Year}</span>
            </div>
            <div>
              Durée : <span>{Runtime}</span>
            </div>
            <div>
              Note : <span>{Ratings.length === 0 ? "Non noté" : Ratings[0].Value}</span>
            </div>
            <div>
              Type : <span>{`${Type} / ${Genre}`}</span>
            </div>
          </div>
          <div className="movie_content_detail">
            Acteurs : <span>{Actors}</span>
          </div>
          <div className="movie_content_detail">
            Réalisateur : <span>{Writer}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(FavoriteMovie);
