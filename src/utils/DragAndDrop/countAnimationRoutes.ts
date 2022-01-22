import { AnimationRoutes, Coordinates, Item } from "../../data_types/types";
import { getItemPosition } from "./index";

const countAnimationRoutes = (
  dragZoneItems: Item[],
  dragItemIndex: number | null,
  dropZonePositon: Coordinates | null,
  sortedItems: Item[] | null
) => {
  const animationRoutesTable: AnimationRoutes[] = [];

  let currentPositionsTable: Coordinates[] = [];

  dragZoneItems.forEach((item, index) => {
    const el = document.getElementById(item.id);
    const position = getItemPosition(el);
    if (
      (dragItemIndex || dragItemIndex === 0) &&
      index === 6 &&
      index !== dragItemIndex &&
      dragItemIndex < 6
    ) {
      const endPositionX = position.x + 5 * 80;
      const endPositionY = position.y - 50;
      const animElement = {
        element: el,
        startPosition: { x: position.x, y: position.y },
        endPosition: { x: endPositionX, y: endPositionY },
      };
      animationRoutesTable.push(animElement);
    }
    if (dropZonePositon && index === dragItemIndex) {
      const animElement = {
        element: el,
        startPosition: { x: position.x, y: position.y },
        endPosition: { x: dropZonePositon.x, y: dropZonePositon.y },
      };
      animationRoutesTable.push(animElement);
    }
    if (
      (dragItemIndex || dragItemIndex === 0) &&
      index > dragItemIndex &&
      index !== 6
    ) {
      const endPositionX = position.x - 80;
      const animElement = {
        element: el,
        startPosition: { x: position.x, y: position.y },
        endPosition: { x: endPositionX, y: position.y },
      };
      animationRoutesTable.push(animElement);
    }
  });

  if (sortedItems) {
    dragZoneItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (item.value !== "") {
        const position = getItemPosition(el);
        currentPositionsTable.push(position);
      }
    });

    dragZoneItems.forEach((item) => {
      if (typeof item !== "undefined") {
        const el = document.getElementById(item.id);
        const position = getItemPosition(el);
        const sortedItemIndex: number = sortedItems.findIndex(
          (el) => el.id === item.id
        );
        const newPosition: Coordinates = currentPositionsTable[sortedItemIndex];
        if (typeof newPosition !== "undefined") {
          const animElement = {
            element: el,
            startPosition: { x: position.x, y: position.y },
            endPosition: {
              x: newPosition.x,
              y: newPosition.y,
            },
          };
          animationRoutesTable.push(animElement);
        } else {
        }
      }
    });
    console.log(dragZoneItems);
    console.log(sortedItems);
    console.log(animationRoutesTable);
  }
  return animationRoutesTable;
};

export default countAnimationRoutes;
