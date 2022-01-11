import styled from "styled-components";

const Message = styled.p`
  color: green;
  font-style: bold;
  font-size: 1.2rem;
  width: 20%;
  margin: 2rem auto 2rem auto;

  &.invalid {
    width: 33%;
    color: red;
  }
`;

export default Message;
