import { useContext } from "react";

import Context from "../store/context";

const Main: React.FC = () => {
  const ctx = useContext(Context);
  let ru = "";
  let en = "";
  if (typeof ctx.sentenceAll[0] !== "undefined") {
    ru = ctx.sentenceAll[0].ru;
    en = ctx.sentenceAll[0].en;
  }
  return (
    <div>
      <h1>Translate this sentence</h1>
      <p>{ru}</p>
      <p>{en}</p>
    </div>
  );
};

export default Main;
