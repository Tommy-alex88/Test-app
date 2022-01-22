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

export type Coordinates = {
  x: number;
  y: number;
};

export type AnimationRoutes = {
  element: HTMLElement | null;
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
};
