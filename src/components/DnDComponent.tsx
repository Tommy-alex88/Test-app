import { Fragment } from "react";

import DnDContainer from "./UI/DnDContainer";
import DragDiv from "./UI/DragDiv";

const DnDComponent: React.FC = () => {
  return (
    <Fragment>
      <DnDContainer>
        <DragDiv>test</DragDiv>
      </DnDContainer>
    </Fragment>
  );
};

export default DnDComponent;
