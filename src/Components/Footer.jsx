import React from "react";
import { FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <div className="footer_infos">
        <p>Site Réalisé par &copy; JEAN Maxime avec React-JS.</p>
        <p>Vous pouvez visiter mon Github</p>
        <a href="https://github.com/gitMax18">
          <FaGithub className="footer_icon" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
