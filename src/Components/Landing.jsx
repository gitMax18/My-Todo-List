import React, { useEffect, useRef } from "react";
import ModalConnexion from "./ModalConnexion";
import ModalInscription from "./ModalInscription";
import firebase from "../firebase";

function Landing(props) {
  const refModalInscription = useRef();
  const refModalConnexion = useRef();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.history.push(`/welcome/${user.uid}/todos`);
      } else {
        //si pas d'user
      }
    });
    return () => {
      unsubscribe();
    };
  }, [props.history]);

  return (
    <div className="landing_page">
      <ModalInscription ref={refModalInscription} />
      <ModalConnexion ref={refModalConnexion} />
      <div className="landing_container">
        <h1 className="landing_title">
          My Todo <span>App !</span>
        </h1>
        <div className="landing_btns">
          <button
            onClick={() => (refModalInscription.current.style.display = "block")}
            className="landing_btn landing_btn_1"
          >
            S'inscrire
          </button>

          <button
            onClick={() => (refModalConnexion.current.style.display = "block")}
            className="landing_btn landing_btn_2"
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}

export default Landing;
