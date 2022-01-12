import styled from "styled-components";

const Bubble = styled.div`
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  border: 2px solid black;
  height: 100px;
  width: 274px;
  margin: 2rem auto 2rem auto;
  border-radius: 25px;
  position: relative;

  &::before {
    border-bottom: 25px solid #f5f5f5;
    border-left: 25px solid transparent;
    bottom: 15px;
    content: "";
    position: absolute;
    right: 272px;
    z-index: 1;
  }
  &::after {
    border-bottom: 27px solid black;
    border-left: 27px solid transparent;
    bottom: 13px;
    content: "";
    position: absolute;
    right: 274px;
    z-index: 0;
  }
`;

export default Bubble;
