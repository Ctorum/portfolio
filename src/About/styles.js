import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 80vh;
  h1 {
    margin: 20px 0 0 0;
    padding: 0;
    color: white;
  }
  .about {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto;
    grid-gap: 75px;
    p {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 150px;
      height: 150px;
      padding: 10px 30px;
      border-radius: 10px;
      background-color: white;
      font-size: 18px;
    }
  }
`;
