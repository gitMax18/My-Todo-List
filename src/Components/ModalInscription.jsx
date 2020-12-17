import React, { useState } from "react";
import { createNewUser } from "../firebase";
import { IoClose } from "react-icons/io5";

const initialData = {
  email: "",
  password: "",
  confirmPassword: "",
};

const ModalInscription = React.forwardRef((props, ref) => {
  const [dataInscription, setDataInscription] = useState(initialData);

  const [dataReturn, setDataReturn] = useState({
    message: "",
    color: "",
  });

  const handleChange = (e) => {
    setDataInscription({ ...dataInscription, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    ref.current.style.display = "none";
    setDataReturn({ message: "", color: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dataInscription.password === dataInscription.confirmPassword) {
      createNewUser(dataInscription.email, dataInscription.password)
        .then(() => {
          setDataReturn({ message: "Insription réussie !", color: "green" });
          setDataInscription(initialData);
        })
        .catch((error) => {
          setDataReturn({ message: error.message, color: "red" });
          setDataInscription(initialData);
        });
    } else {
      setDataReturn({ message: "Vos mots de passe ne sont pas identique", color: "red" });
      setDataInscription({ ...dataInscription, password: "", confirmPassword: "" });
    }
  };

  return (
    <div className="modal_page" ref={ref}>
      <div className="modal_container">
        <button onClick={handleClick} className="modal_close">
          <IoClose />
        </button>
        <h1 className="modal_title">Inscription</h1>
        <p className="modal_information" style={{ color: dataReturn.color }}>
          {dataReturn.message}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="modal_input">
            <label htmlFor="emailInscription">Adresse mail</label>
            <input
              type="email"
              id="emailInscription"
              name="email"
              onChange={handleChange}
              value={dataInscription.email}
            />
          </div>

          <div className="modal_input">
            <label htmlFor="pwdInscription">Mot de passe</label>
            <input
              type="password"
              id="pwdInscription"
              name="password"
              onChange={handleChange}
              value={dataInscription.password}
            />
          </div>

          <div className="modal_input">
            <label htmlFor="confirmPwdInscription">Confirmer mot de passe</label>
            <input
              type="password"
              id="confirmPwdInscription"
              name="confirmPassword"
              onChange={handleChange}
              value={dataInscription.confirmPassword}
            />
          </div>

          <button type="submit" className="modal_btn">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
});

export default ModalInscription;
