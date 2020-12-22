import React, { useEffect } from "react";
import { CgLogOut } from "react-icons/cg";
import firebase, { logOutUser } from "../firebase";
import { NavLink } from "react-router-dom";

function Header({ history, userId }) {
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // if user
      } else {
        history.push("/");
      }
    });
    return () => {
      unsubscribe();
    };
  }, [history]);

  const handleClick = () => {
    logOutUser();
  };

  return (
    <header>
      <div className="header_wrapper">
        <h1 className="header_title">My Todo List</h1>
        <ul className="header_nav">
          <NavLink to={`todos`} className={"header_link"}>
            My Todos
          </NavLink>
          <NavLink to={`movies`} className={"header_link"}>
            My Movies
          </NavLink>
        </ul>
        <button className="header_btn" onClick={handleClick}>
          <CgLogOut className="header_btn_icon" />
        </button>
      </div>
    </header>
  );
}

export default Header;
