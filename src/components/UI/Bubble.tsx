import styled from "styled-components";

const Bubble = styled.div`
  display: inline-flex;
  text-align: center;
  color: #000000;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  justify-content: center;
  align-items: center;
  border: 2px solid #252525;
  height: 90px;
  width: 306px;
  margin: 2rem auto 2rem auto;
  border-radius: 20px 20px 20px 15px;
  position: relative;

  &::before {
    border-bottom: 27px solid #e5e5e5;
    border-left: 27px solid transparent;
    bottom: 9px;
    content: "";
    position: absolute;
    right: 293px;
    z-index: 1;
  }
  &::after {
    border-bottom: 29px solid black;
    border-left: 29px solid transparent;
    bottom: 7px;
    content: "";
    position: absolute;
    right: 295px;
    z-index: 0;
  }
`;

export default Bubble;
