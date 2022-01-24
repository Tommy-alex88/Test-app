import { ReactNode } from "react";

import styled from "styled-components";

const DnDDiv = styled.div`
  display: block;
  min-height: 7rem;
  width: 100%;
  margin: auto auto 2rem auto;
  background-color: inherit;
  backface-visibility: hidden;

  &#drop {
    min-height: 6rem;
    background-image: linear-gradient(90deg, transparent 79px, transparent 81px),
      linear-gradient(#bbbbbb 0.1em, transparent 0.1em);
    background-size: 100% 2.5em;
  }
`;
type Props = {
  id: string;
  onMouseMove: (e: any) => void;
  onMouseUp: (e: any) => void;
  children: ReactNode;
};

const DnDContainer: React.FC<Props> = (props) => {
  return (
    <DnDDiv
      id={props.id}
      onMouseMove={props.onMouseMove}
      onMouseUp={props.onMouseUp}
    >
      {props.children}
    </DnDDiv>
  );
};

export default DnDContainer;
