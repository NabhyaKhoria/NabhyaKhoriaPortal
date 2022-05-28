import React from "react";
import { useUserAuth } from "../../store/AuthProvider";
import Button from "../UI/Button/Button";

export const Logout = (props) => {
  const {logOut} = useUserAuth();
  const clickHandler = async () => {
    try {
      await logOut();
      props.onLogoutButtonClick(true);
    } catch(err) {
      console.log(err.message);
    };
  };
  return (
    <React.Fragment>
      <Button title="Logout" onClick={clickHandler} />
    </React.Fragment>
  );
};
