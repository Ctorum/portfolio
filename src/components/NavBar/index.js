import React from "react";
import { Container } from "./styles";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <Container>
      <nav>
        <div className="logo">Personal Portfolio</div>
        <ul>
          <NavLink to="/" className="li">
            Home
          </NavLink>
          <NavLink to="/about" className="li">
            Sobre
          </NavLink>
          <NavLink to="/contact" className="li">
            Contato
          </NavLink>
          <NavLink to="/skills" className="li">
            Habilidades
          </NavLink>
        </ul>
      </nav>
    </Container>
  );
}
