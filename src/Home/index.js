import React from "react";
import { NavLink } from "react-router-dom";

import { Container } from "./styles";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar></NavBar>
      <Container>
        <div className="home-page">
          <h3>Hello I'm</h3>
          <h1>Vitor</h1>
        </div>
        <span>
          <NavLink to="/about" className="ref">
            {"--> Sobre mim <--"}
          </NavLink>
        </span>
      </Container>
    </>
  );
}
