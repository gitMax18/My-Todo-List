import React, { useState } from "react";
import { reinitializePwd } from "../firebase";
import { IoClose } from "react-icons/io5";

const initialData = {
  message: "Nous vous enverons un Email de réinitialisation de votre mot de passe",
  color: "black",
};

const ModalChangePwd = React.forwardRef(({ hideModalChangePwd, emailConnexion }, ref) => {
  const [email, setEmail] = useState(emailConnexion);

  const [dataReturn, setDataReturn] = useState(initialData);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleClick = () => {
    hideModalChangePwd();
    setDataReturn(initialData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    reinitializePwd(email)
      .then((message) => {
        setDataReturn({ message, color: "green" });
        setEmail("");
      })
      .catch((error) => {
        setDataReturn({ message: error.message, color: "red" });
        setEmail("");
      });
  };

  return (
    <div className="modal_page_changePwd" ref={ref}>
      <div className="modal_container modal_container_changePwd">
        <button onClick={handleClick} className="modal_close">
          <IoClose />
        </button>
        <h1 className="modal_title">Mot de passe oublié</h1>
        <p className="modal_information" style={{ color: dataReturn.color }}>
          {dataReturn.message}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="modal_input">
            <label htmlFor="emailChangepwd">Adresse mail</label>
            <input
              type="emailChangePwd"
              id="emailChangePwd"
              name="email"
              onChange={handleChange}
              value={email}
            />
          </div>

          <button type="submit" className="modal_btn">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
});

export default ModalChangePwd;
