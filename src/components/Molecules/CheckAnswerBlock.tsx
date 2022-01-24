import React, { Fragment } from "react";
import Message from "../Atoms/Message";
import Button from "../Atoms/Button";

type Props = {
  onButtonClick: () => void;
  isValid: boolean | null;
};

const CheckAnswerBlock: React.FC<Props> = (props) => {
  return (
    <Fragment>
      {props.isValid !== null ? (
        <Message className={!props.isValid ? "invalid" : ""}>
          {props.isValid ? "Very well!" : "Something wrong!"}
        </Message>
      ) : null}
      <Button onClick={props.onButtonClick}>Check</Button>
    </Fragment>
  );
};

export default CheckAnswerBlock;
