import { Board } from "../data_types/types";

const checkValidity = (data: string, board: Board): boolean => {
  const testSentence = board.items.map((el) => el.value).join(" ");
  const pattern = new RegExp(`^${testSentence}`);
  const test = data.replace(/,/g, "").toLowerCase().match(pattern);
  if (test !== null && testSentence.length !== 0) {
    return true;
  } else {
    return false;
  }
};

export default checkValidity;
