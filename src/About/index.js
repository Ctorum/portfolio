import React from "react";
import NavBar from "../components/NavBar";
import { Container } from "./styles.js";

export default function About() {
  return (
    <>
      <NavBar></NavBar>
      <Container>
        <h1>Sobre mim</h1>
        <div className="about">
          <p>Meu nome completo é Vitor Hugo Cabral Rezende e tenho 17 anos</p>
          <p>Sou desenvolvedor fullstack e mobile</p>
          <p>Experiencia como front-end</p>
          <p>Experiencia com JavaScript e TypeScript</p>
          <p>Estudante do UNASP campus São Paulo</p>
          <p>Curso o ensino médio integrado ao técnico</p>
        </div>
      </Container>
    </>
  );
}
