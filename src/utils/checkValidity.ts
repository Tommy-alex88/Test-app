import { Board } from "../data_types/types";

const checkValidity = (data: string, board: Board): boolean | string => {
  const testSentence = board.items.map((el) => el.value).join(" ");
  const pattern = new RegExp(`^${testSentence}`);
  const preparedData = data.replace(/,/g, "").toLowerCase();
  const test = preparedData.match(pattern);
  if (test !== null && test[0] == preparedData) return test[0];
  if (test !== null && testSentence.length !== 0) {
    return true;
  } else {
    return false;
  }
};

export default checkValidity;
