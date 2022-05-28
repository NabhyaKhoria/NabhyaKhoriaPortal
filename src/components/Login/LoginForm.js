import React from "react";
import classes from "./LoginForm.module.css";
import Form from "../UI/Form/Form";
import { useRef, useState, useContext } from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import { useUserAuth } from "../../store/AuthProvider";

export const LoginForm = (props) => {
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const [inputPasswordValid, setInputPasswordValid] = useState(true);
  const [inputEmailValid, setInputEmailValid] = useState(true);
  const authCtx = useContext(AuthContext);
  const { logIn } = useUserAuth();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;
    setInputEmailValid(true);
    setInputPasswordValid(true);

    if (enteredEmail.trim().length === 0) {
      setInputEmailValid(false);
      return;
    }
    if (enteredPassword.trim().length === 0) {
      setInputPasswordValid(false);
      return;
    }
    // authCtx.onLogin();
    try {
      await logIn(enteredEmail, enteredPassword);
      props.onLogin();
    } catch (err) {
      console.log(err);
      window.alert(err.message);
      return;
    }
    return;
    // props.onAddToCart(enteredAmountNumber);
  };
  return (
    <React.Fragment>
      <Form>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <Input
            ref={inputEmailRef}
            isValid={inputEmailValid}
            label="Email"
            input={{
              id: "email",
              type: "email",
              maxlength: "30",
              title: "Please enter a valid Email Address",
            }}
          />
          <Input
            ref={inputPasswordRef}
            isValid={inputPasswordValid}
            label="Password"
            input={{
              id: "password",
              type: "password",
              maxlength: "12",
              minlength: "8",
              validate: "validate",
              title: "Password cannot be empty",
            }}
          />

          <div className={classes["form-button"]}>
            <Button title="Login"></Button>
          </div>
        </form>
      </Form>
    </React.Fragment>
  );
};
