import styled from "styled-components";

const DragDiv = styled.div`
  display: inline-flex;
  font-style: inherit;
  justify-content: center;
  align-items: center;
  width: 6rem;
  min-height: 1.5rem;
  margin: 0.5rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 2px darkgray;
  cursor: pointer;

  &.dragging {
    background: transparent;
    color: transparent;
    border: 1px solid #5856d6;
  }
`;

export default DragDiv;
