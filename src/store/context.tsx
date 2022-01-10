import React, { createContext, useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Sentence, Sentences, RespData } from "../data_types/types";

const Context = createContext<Sentences>({
  sentenceAll: [],
});

export const ContextProvider: React.FC = (props) => {
  const [sentences, setSentences] = useState<Sentence[]>([]);

  const fetchData = useCallback(async () => {
    const url =
      "https://academtest.ilink.dev/graphql?query={sentenceAll{en, ru}}";
    const response = await axios.get<RespData>(url);
    const sentenceArr: Sentence[] = response.data.data.sentenceAll;
    setSentences(sentenceArr);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const contextValue: Sentences = {
    sentenceAll: sentences,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default Context;
