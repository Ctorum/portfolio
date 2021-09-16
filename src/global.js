import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body, input, button, select, textarea{
      margin: 0;
      padding: 0;
      outline: 0;
      border: 0 none;
      box-sizing: border-box;
      background-color: #1b1b1b;
      font-family: 'Montserrat', sans-serif;
      textarea:focus, input:focus, select:focus, button:focus {
          box-shadow: 0 0 0 0;
          border: 1px solid transparent;
          outline: none;
      }
  }
  button{
      cursor: pointer;
  }
`;
