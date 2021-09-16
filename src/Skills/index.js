import React from "react";
import NavBar from "../components/NavBar";
import { Container } from "./styles";

export default function Skills() {
  return (
    <>
      <NavBar></NavBar>
      <Container>
        <h1>Habilidades</h1>
        <div className="skills">
          <p>JavaScript</p>
          <p>TypeScript</p>
          <p>ReactJS</p>
          <p>React Native</p>
          <p>C++</p>
          <p>Python</p>
          <p>Django</p>
          <p>Elixir</p>
          <p>Phoenix</p>
        </div>
      </Container>
    </>
  );
}
