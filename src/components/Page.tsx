import { useContext, useState, useEffect, useCallback, useMemo } from "react";

import {
  AnimationRoutes,
  Board,
  Coordinates,
  Item,
  Sentence,
} from "../data_types/types";
import Context from "../store/context";
import checkValidity from "../utils/TextToSpeech/checkValidity";
import {
  animateTable,
  countAnimationRoutes,
  countTableShift,
  sortAnimation,
  sortTable,
} from "../utils/DragAndDrop";
import speechSynthesizer from "../utils/TextToSpeech/speechSynthesizer";
import Main from "./Pattern";

const Page: React.FC = () => {
  // get sentence from context
  const ctx = useContext(Context);
  const sentencePair = ctx.sentenceAll[0];
  let data: Sentence = { en: "", ru: "" };

  data = useMemo(() => {
    if (typeof sentencePair !== "undefined") {
      data = sentencePair;
    }
    return data;
  }, [sentencePair]);

  const [boards, setBoards] = useState<Board[]>([]);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  let dragItem: Item;
  let dragBoard: Board | undefined;

  const prepareBoard = useCallback(() => {
    try {
      const enData = data.en.replace(/,/g, "").toLowerCase().split(" ").sort();
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
  }, [data.en]);

  useEffect(() => {
    prepareBoard();
  }, [prepareBoard]);

  // main drag and drop logic with onMouseDown, onMouseMove and onMouseUp event handlers
  let startY: number;
  let isDragging: boolean = false;
  let animProgress: number = 0;
  let dragElement: HTMLElement;
  let elemBelow: Element | null;
  let dropZonePosition: Coordinates;
  let animationRoutesTable: AnimationRoutes[] = [];
  let dropItemsLenght: number;
  let dropEl: HTMLElement | null;

  // save drag elements and positions, calculate new positions based on current elements layout
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

  // dragging element to calculated above position and simultaniously animating movement of other elements
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

  // check dropzones and draged element behaviour to update corresponding board state
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

  // check if user collected right or wrong siquence of words and speak sentence if right collected
  const checkHandler = () => {
    const isCheckPass: boolean | string = checkValidity(data.en, boards[0]);
    if (typeof isCheckPass === "string") {
      //speechSynthesizer works by default in Chrome, but doesn't in Firefox
      speechSynthesizer(data.en);
      setIsValid(true);
    } else {
      setIsValid(isCheckPass);
    }
  };

  return (
    <Main
      ruSentence={data.ru}
      headerText={"Translate this sentence"}
      boards={boards}
      isValid={isValid}
      onButtonClick={checkHandler}
      onMouseDown={mouseDownHandler}
      onMouseMove={mouseMoveHandler}
      onMouseUp={mouseUpHandler}
    ></Main>
  );
};

export default Page;
