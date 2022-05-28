import React from "react";
import Button from "../UI/Button/Button";

export const Login = (props) => {
  const clickHandler = () => {
    props.onLoginButtonClick(true);
  };
  return (
    <React.Fragment>
      <Button title="Login" onClick={clickHandler} />
    </React.Fragment>
  );
};
