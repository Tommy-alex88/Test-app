import { AnimationRoutes } from "../../data_types/types";

const animateTable = (
  table: AnimationRoutes[],
  dragElement: HTMLElement | null,
  animationProgress: number | null
) => {
  //amimation of movement of all elements besides of dragElement
  table.forEach((l) => {
    if (l.element && l.element !== dragElement && animationProgress) {
      // for elements with horizontal only movement
      if (l.startPosition.y === l.endPosition.y) {
        const xtrans = l.startPosition.x - l.endPosition.x;
        const deltaY = 0;
        const deltaX = xtrans * animationProgress;
        if (Math.abs(deltaX) < xtrans && deltaX < 0) {
          const translate = `translate(${deltaX}px, ${deltaY}px)`;
          l.element.style.transform = translate;
        }
      } else {
        // fpr elements with diagonal movement
        const xtrans: number = l.startPosition.x - l.endPosition.x;
        const ytrans: number = l.startPosition.y - l.endPosition.y;
        const distance = Math.sqrt(xtrans * xtrans + ytrans * ytrans);
        const vector: number = xtrans / ytrans;
        const deltaY: number = ytrans * animationProgress;
        const deltaX: number = deltaY * vector;
        const path = Math.sqrt(deltaY * deltaY + deltaX * deltaX);
        if (path <= distance && deltaX > 0) {
          let translate = `translate(${deltaX}px, ${deltaY}px)`;
          l.element.style.transform = translate;
        }
      }
    }
  });
  if (!dragElement && !animationProgress) {
    table.forEach((l) => {
      if (l.element) {
        // all elements animation when sorting
        const xtrans = l.startPosition.x - l.endPosition.x;
        const deltaX = -xtrans;
        const ytrans: number = l.startPosition.y - l.endPosition.y;
        const deltaY: number = -ytrans;
        let translate = `translate(${deltaX}px, ${deltaY}px)`;
        l.element.style.transform = translate;
        l.element.style.transition = "all 0.5s";
      }
    });
  }
};

export default animateTable;
