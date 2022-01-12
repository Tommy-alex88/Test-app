export type Sentence = {
  en: string;
  ru: string;
};
export type Sentences = {
  sentenceAll: Sentence[];
};
export type RespData = {
  data: Sentences;
};

export type Board = {
  id: "drag" | "drop";
  items: Item[];
};

export type Item = {
  id: string;
  value: string;
};
