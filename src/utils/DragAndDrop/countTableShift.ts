const countTableShift = (itemIndex: number, dropItemsLenght: number) => {
  let rowShift: number = 10;
  let multiplier: number = dropItemsLenght;
  if (dropItemsLenght > 5 && itemIndex <= 5) {
    rowShift = 48;
    multiplier = dropItemsLenght - 6;
  }
  return { rowShift, multiplier };
};

export default countTableShift;
