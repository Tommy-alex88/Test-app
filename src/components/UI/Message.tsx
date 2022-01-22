import styled from "styled-components";

const Message = styled.p`
  color: green;
  width: 470px;
  height: 28px;
  text-align: center;
  margin: 2rem auto 2rem auto;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  text-shadow: -1px -2px 2px #ffffff, 1px 2px 2px rgba(91, 13, 13, 0.5);

  &.invalid {
    width: 470px;
    color: #ff0000;
  }
`;

export default Message;
