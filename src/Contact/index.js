import React from "react";
import NavBar from "../components/NavBar";
import { Container } from "./styles";

export default function Contact() {
  return (
    <>
      <NavBar></NavBar>
      <Container>
        <h1>Formas de contato</h1>
        <div className="contact">
          <p>Whatsapp: (11) 986080044</p>
          <p>Discord: Vito Vito#8302</p>
          <p>Email: dev.rezendevitor@gmail.com</p>
        </div>
      </Container>
    </>
  );
}
