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