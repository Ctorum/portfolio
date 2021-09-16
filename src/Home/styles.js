import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 50%;
  color: white;
  .home-page {
    width: 100%;
    height: 100%;
    h3 {
      font-size: 50px;
      font-weight: normal;
      text-align: center;
      margin: calc(100vh - 35%) 0 0 0;
      padding: 0;
      color: gray;
    }
    h1 {
      font-size: 110px;
      text-align: center;
      margin: 0;
      padding: 0;
    }
  }
  span {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -90%);
    top: 90%;
    .ref {
      text-decoration: none;
      color: white;
    }
  }
`;
