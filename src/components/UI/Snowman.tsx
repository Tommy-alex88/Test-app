import styled from "styled-components";

const Snowman = styled.div`
  display: inline-flex;
  align-items: flex-end;
  margin-top: 10rem;
  margin-bottom: 1rem;
  width: 200px;
  height: 100px;
  background-color: gray;
  border-top-left-radius: 110px;
  border-top-right-radius: 110px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  border: 5px solid gray;
  border-bottom: 0;
  z-index: 0;
  position: relative;

  &::before {
    position: absolute;
    left: 45px;
    bottom: 100px;
    width: 100px;
    height: 100px;
    background-color: gray;
    border-radius: 150px;
    border: 5px solid gray;
    content: "";
    z-index: 1;
  }
`;

export default Snowman;
