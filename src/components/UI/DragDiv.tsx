import styled from "styled-components";

const DragDiv = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: bottom;
  width: 6rem;
  min-height: 1.5rem;
  margin: 0.5rem;
  border-radius: 1rem;

  &.item {
    cursor: pointer;
    background-color: white;
    box-shadow: 0 2px darkgray;
  }

  &.empty {
    cursor: auto;
    background-color: #ebebeb;
    box-shadow: 0 -2px darkgray;
  }
`;

export default DragDiv;
