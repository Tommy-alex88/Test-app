import styled from "styled-components";

const DnDContainer = styled.div`
  min-height: 7rem;
  width: 92%;
  margin: auto auto 2rem auto;
  display: block;
  background-color: inherit;

  &.drop {
    min-height: 6rem;
    background-image: linear-gradient(90deg, transparent 79px, transparent 81px),
      linear-gradient(#bbbbbb 0.1em, transparent 0.1em);
    background-size: 100% 2.5em;
  }
  &#addLine {
    min-height: 8rem;
  }
`;

export default DnDContainer;
