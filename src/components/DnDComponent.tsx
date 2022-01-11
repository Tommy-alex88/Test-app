import { Fragment, useState, useEffect, useCallback } from "react";

import { Board } from "../data_types/types";
import Button from "./UI/Button";
import Message from "./UI/Message";

import DnDContainer from "./UI/DnDContainer";
import DnDItem from "./UI/DragDiv";

const DnDComponent: React.FC<{ data: string }> = ({ data }) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [currentItem, setCurrentItem] = useState<string>();
  const [currentBoard, setCurrentBoard] = useState<Board>();
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const prepareData = useCallback(() => {
    try {
      const enData = data.replace(/,/g, "").toLowerCase().split(" ");
      setBoards([
        { id: "drop", items: [] },
        { id: "drag", items: enData.sort() },
      ]);
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  useEffect(() => {
    prepareData();
  }, [prepareData]);

  const dragHandler = (
    e: React.MouseEvent<HTMLElement>,
    board: Board,
    item: string
  ) => {
    if (item !== currentItem) {
      setCurrentBoard(board);
      setCurrentItem(item);
      setIsValid(null);
    }
  };

  const dragStartHandler = (e: React.MouseEvent<HTMLElement>) => {};

  const dragOverHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const dragLeavHandler = (e: React.MouseEvent<HTMLElement>) => {};
  const dragEndHandler = (e: React.MouseEvent<HTMLElement>) => {};

  const dropHandler = (
    e: React.MouseEvent<HTMLElement>,
    board: Board,
    item: string | null
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      typeof currentBoard !== "undefined" &&
      typeof currentItem !== "undefined"
    ) {
      if (item === null) {
        board.items.push(currentItem);
      }
      const currentIndex = currentBoard.items.indexOf(currentItem);
      const tempBoard = { ...currentBoard };
      tempBoard.items.splice(currentIndex, 1);
      setCurrentBoard(tempBoard);

      if (item !== null) {
        const dropIndex = board.items.indexOf(item);
        board.items.splice(dropIndex + 1, 0, currentItem);
      }

      if (board.id === "drag") {
        board.items.sort();
      }
      setCurrentItem("");

      setBoards(
        boards.map((b) => {
          if (b.id === board.id) {
            return board;
          }
          if (b.id === currentBoard.id) {
            return currentBoard;
          }
          return b;
        })
      );
    }
  };

  const dragOverCardHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const checkHandler = () => {
    const testSentence = boards[0].items.join(" ");
    const pattern = new RegExp(`^${testSentence}`);
    try {
      const test = data.replace(/,/g, "").toLowerCase().match(pattern);
      if (test !== null && testSentence.length !== 0) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {boards.map((board) => {
        return (
          <DnDContainer
            key={Math.random()}
            onDragOver={(e) => dragOverCardHandler(e)}
            onDrop={(e) => dropHandler(e, board, null)}
            className={board.id === "drag" ? "drag" : "drop"}
            id={board.items.length >= 5 && board.id === "drop" ? "addLine" : ""}
          >
            {board.items.map((item) => {
              return (
                <DnDItem
                  key={Math.random()}
                  className="item"
                  draggable="true"
                  onDrag={(e) => dragHandler(e, board, item)}
                  onDragStart={(e) => dragStartHandler(e)}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDragLeave={(e) => dragLeavHandler(e)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDrop={(e) => dropHandler(e, board, item)}
                >
                  {item}
                </DnDItem>
              );
            })}
          </DnDContainer>
        );
      })}
      {isValid !== null ? (
        <Message className={!isValid ? "invalid" : ""}>
          {isValid ? "Very well!" : "Something wrong!"}
        </Message>
      ) : null}
      <Button onClick={checkHandler}>Check</Button>
    </Fragment>
  );
};

export default DnDComponent;
