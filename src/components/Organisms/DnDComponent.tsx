import { Fragment } from "react";

import { Board, Item } from "../../data_types/types";
import DnDContainer from "../Atoms/DnDContainer";
import DragDiv from "../Atoms/DragDiv";
import DropDiv from "../Atoms/DropDiv";

type Props = {
  boards: Board[];
  onMouseDown: (e: any, board: Board, item: Item) => void;
  onMouseMove: (e: any) => void;
  onMouseUp: (e: any) => void;
};

const DnDComponent: React.FC<Props> = (props) => {
  return (
    <Fragment>
      {props.boards.map((board) => {
        return (
          <DnDContainer
            key={Math.random()}
            onMouseMove={(e) => props.onMouseMove(e)}
            onMouseUp={(e) => props.onMouseUp(e)}
            id={board.id === "drag" ? "drag" : "drop"}
          >
            {board.items.map((item) => {
              return (
                <DropDiv
                  key={Math.random()}
                  id={board.id === "drag" ? "drag" : ""}
                >
                  {item.value !== "" && (
                    <DragDiv
                      key={Math.random()}
                      onMouseDown={(e) => props.onMouseDown(e, board, item)}
                      id={item.id}
                    >
                      {item.value}
                    </DragDiv>
                  )}
                </DropDiv>
              );
            })}
          </DnDContainer>
        );
      })}
    </Fragment>
  );
};

export default DnDComponent;
