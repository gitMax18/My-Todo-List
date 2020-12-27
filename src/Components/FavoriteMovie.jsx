import React, { useRef, useEffect, useState } from "react";
import { useHandleHeight } from "../personnalHooks";
import { IoClose } from "react-icons/io5";
import { RiDeleteBack2Fill } from "react-icons/ri";
import ReactLoading from "react-loading";

function FavoriteMovie({ movieId, removeMovie }) {
  const [movieData, setMovieData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { Title, Year, Runtime, Genre, Plot, Poster, Ratings = [], Type, Actors, Writer, imdbID } = movieData;
  const refContent = useRef();

  const [isShow, manageValue] = useHandleHeight(true, refContent);

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?i=${movieId}&plot=full&apikey=a80c0cee&`)
      .then((response) => response.json())
      .then((data) => {
        setMovieData({ ...data });
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [movieId]);

  const handleClick = () => {
    manageValue();
  };

  let classNameIcon = "favoriteMovie_header_icon";
  classNameIcon += !isShow ? " favoriteMovie_header_icon-show" : "";

  return (
    <div className="favoriteMovie_container">
      <div className="favoriteMovie_header">
        {isLoading ? (
          <div className="favoriteMovie_loader">
            <ReactLoading type={"bubbles"} color={"#f5f0e1"} width={"5rem"} height={"5rem"} />
          </div>
        ) : (
          <React.Fragment>
            <div className="favoriteMovie_header_delete" onClick={() => removeMovie(imdbID)}>
              <RiDeleteBack2Fill className="favoriteMovie_header_deleteIcon" />
            </div>
            <div className="favoriteMovie_header_right" onClick={handleClick}>
              <div className="favoriteMovie_header_infos">
                <h3>{Title}</h3>
              </div>
              <div className={classNameIcon}>
                <IoClose />
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
      <div className="favoriteMovie_content" ref={refContent}>
        <div className="favoriteMovie_content_img">
          {Poster !== "N/A" ? (
            <img src={Poster} alt="movie poster" />
          ) : (
            <p className="favoriteMovie_undefineImg">
              Image
              <br /> indisponible
            </p>
          )}
        </div>
        <div className="favoriteMovie_content_infos">
          <h4 className="favoriteMovie_content_title">Synopsis :</h4>
          <p>{Plot}</p>
          <h4 className="favoriteMovie_content_title">Autre infos :</h4>
          <div className="favoriteMovie_content_details">
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
          <div className="favoriteMovie_content_detail">
            Acteurs : <span>{Actors}</span>
          </div>
          <div className="favoriteMovie_content_detail">
            Réalisateur : <span>{Writer}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(FavoriteMovie);
