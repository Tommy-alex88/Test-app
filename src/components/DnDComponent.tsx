import { Fragment, useState, useEffect, useCallback } from "react";

import { Board, Item } from "../data_types/types";
import Button from "./UI/Button";
import Message from "./UI/Message";
import checkValidity from "../utils/checkValidity";
import speechSynthesizer from "../utils/speechSynthesizer";

import DnDContainer from "./UI/DnDContainer";
import DragDiv from "./UI/DragDiv";

const DnDComponent: React.FC<{ data: string }> = ({ data }) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  let dragItem: Item;
  let dragBoard: Board | undefined;

  const prepareData = useCallback(() => {
    try {
      const enData = data.replace(/,/g, "").toLowerCase().split(" ").sort();
      let cells: Item[] = [];
      for (let i = 0; i <= 11; i++) {
        if (typeof enData[i] !== "undefined") {
          cells.push({
            id: Math.random().toFixed(4).toString(),
            value: enData[i],
          });
        } else {
          cells.push({ id: Math.random().toFixed(4).toString(), value: "" });
        }
      }

      setBoards([
        { id: "drop", items: [] },
        { id: "drag", items: cells },
      ]);
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  useEffect(() => {
    prepareData();
  }, [prepareData]);

  const checkHandler = () => {
    const isCheckPass: boolean | string = checkValidity(data, boards[0]);
    if (typeof isCheckPass === "string") {
      speechSynthesizer(data);
    } else {
      setIsValid(isCheckPass);
    }
  };

  const dragHandler = (
    e: React.MouseEvent<HTMLElement>,
    board: Board,
    item: Item
  ) => {};

  const dragStartHandler = (
    e: React.MouseEvent<HTMLElement>,
    board: Board,
    item: Item
  ) => {
    if (item !== dragItem && item.value !== "") {
      dragBoard = board;
      dragItem = item;
    }
  };

  const dragOverHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const dragLeavHandler = (e: React.MouseEvent<HTMLElement>) => {};
  const dragEndHandler = (e: React.MouseEvent<HTMLElement>) => {};

  const dropHandler = (
    e: React.MouseEvent<HTMLElement>,
    dropBoard: Board,
    dropItem: Item | null
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (isValid !== null) {
      setIsValid(null);
    }
    if (typeof dragBoard !== "undefined" && typeof dragItem !== "undefined") {
      // dragBoard is board where we take item from, dropBoard is board where we drop item to
      if (
        dropItem !== null &&
        dropBoard.id === "drop" &&
        dragBoard.id === "drag"
      ) {
        const dropIndex = dropBoard.items.indexOf(dropItem);
        dropBoard.items.splice(dropIndex, 0, dragItem);
      }

      if (dropItem === null) {
        if (
          (dragBoard.id === "drop" && dropBoard.id === "drop") ||
          dropBoard.id === "drag"
        ) {
          return;
        } else {
          dropBoard.items.push(dragItem);
        }
      }

      // change position of items in the check board
      if (dragBoard.id === "drop" && dropBoard.id === "drop") {
        if (dropItem !== null) {
          const dragIndex = dropBoard.items.findIndex(
            (el) => el.id === dragItem.id
          );
          const dropIndex = dropBoard.items.findIndex(
            (el) => el.id === dropItem.id
          );
          const tempItem: Item = dropBoard.items[dropIndex];

          dropBoard.items[dropIndex] = dropBoard.items[dragIndex];
          dropBoard.items[dragIndex] = tempItem;

          console.log("пытаюсь поменять местами");
        } else {
          return;
        }
      }

      // remove dragItem from Board totally if dropping down from check board to cloud
      if (dragBoard.id === "drop" && dropBoard.id === "drag") {
        const dragIndex = dragBoard.items.findIndex(
          (el) => el.id === dragItem.id
        );
        dragBoard.items.splice(dragIndex, 1);
        console.log("если из дроп " + dragItem.value);
      }

      // remove dragItem from Board with empty place left if board.is === drag
      if (dragBoard.id === "drag" && dropBoard.id === "drop") {
        const dragIndex = dragBoard.items.findIndex(
          (el) => el.id === dragItem.id
        );
        dragBoard.items.splice(dragIndex, 1, { id: "empty", value: "" });
      }

      // drop item to empty zone in dragBoard
      if (dropBoard.id === "drag" && dragBoard.id !== "drag") {
        const dropIndex = dropBoard.items.findIndex((el) => el.id === "empty");
        console.log(dropIndex);
        dropBoard.items.splice(dropIndex, 1, dragItem);
      }

      // sort cloud bord
      if (dropBoard.id === "drag") {
        dropBoard.items.sort((a, b) =>
          a.value === "" ? 1 : a.value > b.value ? 1 : -1
        );
      }
      dragBoard = undefined;
      // rerender boards
      setBoards(
        boards.map((b) => {
          if (b.id === dropBoard.id) {
            return dropBoard;
          }
          if (b.id === dragBoard?.id && dragBoard) {
            return dragBoard;
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

  return (
    <Fragment>
      {boards.map((board) => {
        return (
          <DnDContainer
            draggable="false"
            key={Math.random()}
            onDragOver={(e) => dragOverCardHandler(e)}
            onDrop={(e) => dropHandler(e, board, null)}
            className={board.id === "drag" ? "drag" : "drop"}
            id={board.items.length >= 5 && board.id === "drop" ? "addLine" : ""}
          >
            {board.items.map((item) => {
              return (
                <DragDiv
                  key={Math.random()}
                  className={item.value === "" ? "empty" : "item"}
                  draggable={item.value === "" ? "false" : "true"}
                  onDrag={(e) => dragHandler(e, board, item)}
                  onDragStart={(e) => dragStartHandler(e, board, item)}
                  onDragOver={(e) => dragOverHandler(e)}
                  onDragLeave={(e) => dragLeavHandler(e)}
                  onDragEnd={(e) => dragEndHandler(e)}
                  onDrop={(e) => dropHandler(e, board, item)}
                >
                  {item.value}
                </DragDiv>
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
