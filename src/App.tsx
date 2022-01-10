import { Fragment } from "react";
import Main from "./components/Main";
import GlobalStyle from "./GlobalStyle";

const App: React.FC = () => {
  return (
    <Fragment>
      <GlobalStyle />
      <Main />
    </Fragment>
  );
};

export default App;
