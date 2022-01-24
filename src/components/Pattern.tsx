import styled from "styled-components";

import Bubble from "./Atoms/Bubble";
import Snowman from "./Atoms/Snowman";
import DnDComponent from "./Organisms/DnDComponent";
import CheckAnswerBlock from "./Molecules/CheckAnswerBlock";
import { Board, Item } from "../data_types/types";

const MainDiv = styled.div`
  width: 491px;
  margin: auto;
  h1 {
    font-size: 36px;
    font-style: normal;
    font-weight: normal;
    line-height: 42px;
    color: #252525;
    text-shadow: -2px -4px 3px #ffffff, 2px 4px 3px rgba(0, 0, 0, 0.25);
  }
`;

const SnowmanDiv = styled.div`
  display: flex;
`;
type Props = {
  ruSentence: string;
  boards: Board[];
  headerText: string;
  isValid: boolean | null;
  onButtonClick: () => void;
  onMouseDown: (e: any, board: Board, item: Item) => void;
  onMouseMove: (e: any) => void;
  onMouseUp: (e: any) => void;
};

const Main: React.FC<Props> = (props) => {
  return (
    <MainDiv>
      <h1>{props.headerText}</h1>
      <SnowmanDiv>
        <Snowman />
        <Bubble>{props.ruSentence}</Bubble>
      </SnowmanDiv>
      <DnDComponent
        boards={props.boards}
        onMouseDown={props.onMouseDown}
        onMouseMove={props.onMouseMove}
        onMouseUp={props.onMouseUp}
      />
      <CheckAnswerBlock
        isValid={props.isValid}
        onButtonClick={props.onButtonClick}
      ></CheckAnswerBlock>
    </MainDiv>
  );
};

export default Main;
