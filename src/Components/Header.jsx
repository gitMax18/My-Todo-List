import React, { useEffect } from "react";
import { CgLogOut } from "react-icons/cg";
import firebase, { logOutUser } from "../firebase";

function Header({ history }) {
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
        <button className="header_btn" onClick={handleClick}>
          <CgLogOut className="header_btn_icon" /> &nbsp;<span>Déconnexion</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
