import { Fragment } from "react";
import Page from "./components/Page";
import GlobalStyle from "./GlobalStyle";

const App: React.FC = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <Page />
    </Fragment>
  );
};

export default App;
