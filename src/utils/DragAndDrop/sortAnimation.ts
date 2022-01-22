import { animateTable, countAnimationRoutes } from ".";
import { Item } from "../../data_types/types";

const sortAnimation = (table: Item[], sortedTable: Item[]) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      const sortedItemsRoutesTable = countAnimationRoutes(
        table,
        null,
        null,
        sortedTable
      );
      animateTable(sortedItemsRoutesTable, null, null);
      resolve();
    }, 100);
  });
};

export default sortAnimation;
