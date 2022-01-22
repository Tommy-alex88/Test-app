import { useContext } from "react";
import styled from "styled-components";

import Context from "../store/context";
import Bubble from "./UI/Bubble";
import Snowman from "./UI/Snowman";
import DnDComponent from "./DnDComponent";

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

const Main: React.FC = () => {
  const ctx = useContext(Context);
  let ru = "";
  let en = "";
  if (typeof ctx.sentenceAll[0] !== "undefined") {
    ru = ctx.sentenceAll[0].ru;
    en = ctx.sentenceAll[0].en;
  }
  return (
    <MainDiv>
      <h1>Translate this sentence</h1>
      <SnowmanDiv>
        <Snowman />
        <Bubble>{ru}</Bubble>
      </SnowmanDiv>
      <DnDComponent data={en}></DnDComponent>
    </MainDiv>
  );
};

export default Main;
