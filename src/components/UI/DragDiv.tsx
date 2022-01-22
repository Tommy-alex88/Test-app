import { ReactNode } from "react";

import styled from "styled-components";

const Div = styled.div`
  display: inline-flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  vertical-align: bottom;
  width: 70px;
  min-height: 30px;
  border: 1px solid #c9c9c9;
  border-radius: 13px;
  user-select: none;
  backface-visibility: hidden;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 21px;
  cursor: pointer;
  background-color: #ffffff;
  box-shadow: 0px 8px 4px -6px rgba(0, 0, 0, 0.25);
`;
type Props = {
  children: ReactNode;
  id: string;
  onMouseDown: (e: any) => void;
};

const DragDiv: React.FC<Props> = (props) => {
  return (
    <Div id={props.id} onMouseDown={props.onMouseDown}>
      {props.children}
    </Div>
  );
};

export default DragDiv;
