import { Fragment, useState, useEffect, useCallback, MouseEvent } from "react";

import { Board, Coordinates, Item, AnimationRoutes } from "../data_types/types";
import Button from "./UI/Button";
import Message from "./UI/Message";
import checkValidity from "../utils/checkValidity";
import {
  animateTable,
  countTableShift,
  countAnimationRoutes,
  sortAnimation,
  sortTable,
} from "../utils/DragAndDrop";
import speechSynthesizer from "../utils/speechSynthesizer";

import DnDContainer from "./UI/DnDContainer";
import DragDiv from "./UI/DragDiv";
import DropDiv from "./UI/DropDiv";

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
            id: enData[i] + i + Date.now().toString(),
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
      //it works in Chrome by default
      // speechSynthesizer(data);
      console.log(data);
      setIsValid(true);
    } else {
      setIsValid(isCheckPass);
    }
  };

  let startY: number;
  let isDragging: boolean = false;
  let animProgress: number = 0;
  let dragElement: HTMLElement;
  let elemBelow: Element | null;
  let dropZonePosition: Coordinates;
  let animationRoutesTable: AnimationRoutes[] = [];
  let dropItemsLenght: number;
  let dropEl: HTMLElement | null;

  const mouseDownHandler = (e: MouseEvent, board: Board, item: Item) => {
    e.preventDefault();
    dragItem = item;
    dragBoard = board;
    dragElement = e.currentTarget as HTMLElement;

    let shiftX = e.clientX - dragElement.getBoundingClientRect().left;
    let shiftY = e.clientY - dragElement.getBoundingClientRect().top;

    const dragItemIndex = dragBoard.items.indexOf(dragItem);

    if (dragBoard.id === "drag") {
      dropItemsLenght = boards[0].items.length;
      dropEl = document.getElementById("drop");
    } else if (dragBoard.id === "drop") {
      dropItemsLenght = boards[1].items.filter((i) => i.value !== "").length;
      dropEl = document.getElementById("drag");
    }
    // count coordinates of drop zone
    if (dropEl) {
      const dropElCoord = dropEl.getBoundingClientRect();
      const { rowShift, multiplier } = countTableShift(
        dragItemIndex,
        dropItemsLenght
      );

      dropZonePosition = {
        x: e.clientX - dropElCoord.left - shiftX - 5 - multiplier * 80,
        y: e.clientY - dropElCoord.top - shiftY - rowShift,
      };
    }
    animationRoutesTable = countAnimationRoutes(
      dragBoard.items,
      dragItemIndex,
      dropZonePosition,
      null
    );

    startY = e.pageY;
    isDragging = true;
  };

  const mouseMoveHandler = (e: MouseEvent) => {
    if (!isDragging) {
      return;
    }
    if (dragElement) {
      dragElement.style.display = "none";
      elemBelow = document.elementFromPoint(e.clientX, e.clientY);
      dragElement.style.display = "inline-flex";

      const elIndex = animationRoutesTable.findIndex(
        (el) => el.element === dragElement
      );
      const el = animationRoutesTable[elIndex];

      let vector: number = el.endPosition.x / el.endPosition.y;
      let dy: number = e.pageY - startY;
      let dx: number = dy * vector;
      animProgress = dy / el.endPosition.y; // progress of animation played

      if (animProgress < 0 && Math.abs(animProgress) <= 1) {
        let translate: string = `translate(${dx}px, ${dy}px)`;
        dragElement.style.transform = translate;
      }
      animateTable(animationRoutesTable, dragElement, animProgress);
    }
  };

  const mouseUpHandler = (e: MouseEvent) => {
    isDragging = false;
    if (isValid !== null) {
      setIsValid(null);
    }
    const tempDropItems = boards[0].items.map((a) => {
      return { ...a };
    });
    const tempDragItems = boards[1].items.map((a) => {
      return { ...a };
    });

    if (typeof dragBoard !== "undefined") {
      if (dragBoard.id === "drag" && elemBelow?.id.includes("drop")) {
        tempDropItems.push(dragItem);
        let dragIndex = dragBoard.items.indexOf(dragItem);
        tempDragItems.splice(dragIndex, 1);
        tempDragItems.push({
          id: Math.random().toFixed(4).toString(),
          value: "",
        });
      }
      if (dragBoard.id === "drop" && elemBelow?.id.includes("drag")) {
        let dragIndex = dragBoard.items.indexOf(dragItem);
        tempDropItems.splice(dragIndex, 1);
        tempDragItems.splice(dropItemsLenght, 1, dragItem);
      }

      const updatedBoards: Board[] = [
        { id: "drop", items: tempDropItems },
        { id: "drag", items: tempDragItems },
      ];

      setBoards(updatedBoards);

      if (dragBoard.id === "drop") {
        console.log(boards[1].items);

        const sortedItems = sortTable(tempDragItems);

        sortAnimation(tempDragItems, sortedItems)
          .then(() => {
            setTimeout(() => {
              const updatedBoards: Board[] = [
                { id: "drop", items: tempDropItems },
                { id: "drag", items: sortedItems },
              ];
              setBoards(updatedBoards);
            }, 500);
          })
          .catch((error) => console.log(error.message));
      }
    }
  };

  return (
    <Fragment>
      {boards.map((board) => {
        return (
          <DnDContainer
            key={Math.random()}
            onMouseMove={(e) => mouseMoveHandler(e)}
            onMouseUp={(e) => mouseUpHandler(e)}
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
                      onMouseDown={(e) => mouseDownHandler(e, board, item)}
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
