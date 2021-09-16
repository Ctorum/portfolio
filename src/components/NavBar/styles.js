import styled from "styled-components";

export const Container = styled.div`
  overflow-x: hidden;
  nav {
    display: flex;
    height: 80px;
    width: 100vw;
    background: #1b1b1b;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px 0 100px;
    flex-wrap: wrap;
    border-bottom: 1px solid white;
    .logo {
      color: #fff;
      font-size: 35px;
      font-weight: 600;
      margin-left: -75px;
    }
    .menu-btn i {
      color: #fff;
      font-size: 22px;
      cursor: pointer;
      display: none;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      margin-right: 100px;
      .li {
        margin: 0 5px;

        color: #f2f2f2;
        text-decoration: none;
        font-size: 18px;
        font-weight: 500;
        padding: 8px 15px;
        border-radius: 5px;
        letter-spacing: 1px;
        transition: all 0.3s ease;
        &:first-child,
        &:hover {
          color: #111;
          background: #fff;
        }
      }
    }
  }
  input[type="checkbox"] {
    display: none;
  }
`;
