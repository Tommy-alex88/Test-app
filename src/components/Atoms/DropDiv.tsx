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
  margin: 0.5rem 0.3rem;
  cursor: auto;

  &#drag {
    border: 1px solid #c9c9c9;
    border-radius: 13px;
    background-color: #ebebeb;
    box-shadow: inset 0px 8px 4px -6px rgba(0, 0, 0, 0.25);
  }
`;
type Props = {
  children: ReactNode;
  id: string;
};

const DropDiv: React.FC<Props> = (props) => {
  return <Div id={props.id}>{props.children}</Div>;
};

export default DropDiv;
