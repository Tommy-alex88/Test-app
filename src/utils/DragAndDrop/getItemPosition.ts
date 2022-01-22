import { Coordinates } from "../../data_types/types";

const getItemPosition = (htmlElement: HTMLElement | null): Coordinates => {
  let position: Coordinates = { x: 0, y: 0 };
  if (htmlElement) {
    position = {
      x: htmlElement.getBoundingClientRect().left,
      y: htmlElement.getBoundingClientRect().top,
    };
  }
  return position;
};

export default getItemPosition;
