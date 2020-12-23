import React, { useEffect, useRef, useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { FaListUl } from "react-icons/fa";
import { RiMovieLine } from "react-icons/ri";
import firebase, { logOutUser } from "../firebase";
import { NavLink } from "react-router-dom";

function Header({ history }) {
  const [isShowNav, setIsShowNav] = useState(false);

  // const refNav = useRef();

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

  const handleNavClick = () => {
    setIsShowNav((boolean) => !boolean);
  };

  const navBtnClassName = isShowNav
    ? "header_nav_btnCircle header_nav_btnCircle-active"
    : "header_nav_btnCircle ";

  const navHeaderClassName = isShowNav ? "header_nav header_nav-active" : "header_nav";

  return (
    <header>
      <div className="header_wrapper">
        <h1 className="header_title">My Todo List</h1>
        <ul className={navHeaderClassName}>
          <li>
            <NavLink to={`todos`} className="header_link" activeClassName="header_link-active">
              <FaListUl className="header_nav_icon" /> <span>Todos</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={`movies`} className="header_link" activeClassName="header_link-active">
              <RiMovieLine className="header_nav_icon" /> <span>Movies</span>
            </NavLink>
          </li>
          <li>
            <button className="header_btn" onClick={handleClick}>
              <CgLogOut className="header_btn_icon" />
            </button>
          </li>
        </ul>
        <div className={navBtnClassName} onClick={handleNavClick}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    </header>
  );
}

export default Header;
