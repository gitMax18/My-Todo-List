import React, { useState } from "react";
import { signUpUser } from "../firebase";
import { IoClose } from "react-icons/io5";
import ModalChangePwd from "./ModalChangePwd";

const initialData = {
  email: "",
  password: "",
};

const ModalConnexion = React.forwardRef((props, ref) => {
  const [dataConnexion, setDataConnexion] = useState(initialData);

  const [dataReturn, setDataReturn] = useState({
    message: "",
    color: "",
  });

  const [displayModal, setDisplayModal] = useState(false);

  const handleChange = (e) => {
    setDataConnexion({ ...dataConnexion, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    ref.current.style.display = "none";
    setDataReturn({ message: "", color: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpUser(dataConnexion.email, dataConnexion.password)
      .then(() => {
        setDataReturn({ message: "Connexion réussie !", color: "green" });
        setDataConnexion(initialData);
      })
      .catch((error) => {
        setDataReturn({ message: error.message, color: "red" });
        setDataConnexion(initialData);
      });
  };

  const hideModalChangePwd = () => {
    setDisplayModal(false);
  };

  const activeModalChangePwd = () => {
    setDisplayModal(true);
  };

  return (
    <React.Fragment>
      {displayModal ? (
        <ModalChangePwd hideModalChangePwd={hideModalChangePwd} emailConnexion={dataConnexion.email} />
      ) : (
        <div className="modal_page" ref={ref}>
          <div className="modal_container modal_container_connexion">
            <button onClick={handleClick} className="modal_close">
              <IoClose />
            </button>
            <h1 className="modal_title">Connexion</h1>
            <p className="modal_information" style={{ color: dataReturn.color }}>
              {dataReturn.message}
            </p>
            <form onSubmit={handleSubmit}>
              <div className="modal_input">
                <label htmlFor="emailConnexion">Adresse mail</label>
                <input
                  type="emailConnexion"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={dataConnexion.email}
                />
              </div>

              <div className="modal_input">
                <label htmlFor="pwdConnexion">Mot de passe</label>
                <input
                  type="password"
                  id="pwdConnexion"
                  name="password"
                  onChange={handleChange}
                  value={dataConnexion.password}
                />
              </div>

              <button type="submit" className="modal_btn">
                Se connecter
              </button>
            </form>
            <button className="modal_btn_changePwd" onClick={activeModalChangePwd}>
              Mot de passe oublié ?
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
});

export default ModalConnexion;
