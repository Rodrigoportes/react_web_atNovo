import React from "react";
import { NavLink } from "react-router-dom"; 
import "../css/FooterMenu.css";

const FooterMenu = () => {
  return (
    <div className="footer-menu">
      <NavLink to="/countries" className="footer-button">
        Countries
      </NavLink>
      <NavLink to="/authorities" className="footer-button">
        Authorities
      </NavLink>
      <NavLink to="/agendas" className="footer-button">
        Agendas
      </NavLink>
    </div>
  );
};

export default FooterMenu;
