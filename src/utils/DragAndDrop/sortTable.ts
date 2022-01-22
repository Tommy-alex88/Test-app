import { Item } from "../../data_types/types";

const sortTable = (table: Item[]) => {
  //deep clone the array of Items
  const tempItems: Item[] = table.map((a) => {
    return { ...a };
  });

  // sort
  tempItems.sort((a, b) => (a.id > b.id ? 1 : -1));

  let memArr1: Item[] = [];
  let memArr2: Item[] = [];
  // devide empty and non-empty items
  for (let i = 0; i <= tempItems.length; i++) {
    if (typeof tempItems[i] !== "undefined") {
      if (tempItems[i].value === "") {
        memArr1.push(tempItems[i]);
      } else {
        memArr2.push(tempItems[i]);
      }
    }
  }
  // concat items so that empty items to be in the end of array
  const sortedItems: Item[] = memArr2.concat(memArr1);
  return sortedItems;
};

export default sortTable;
