import React, { createContext, useState } from "react";

import { Sentence, Sentences } from "../data_types/types";

const Context = createContext<Sentences>({
  sentenceAll: [],
});

export const ContextProvider: React.FC = (props) => {
  const [sentences, setSentences] = useState<Sentence[]>([]);

  const contextValue: Sentences = {
    sentenceAll: sentences,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default Context;
