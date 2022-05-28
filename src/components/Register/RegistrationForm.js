import React from "react";
import classes from "./RegistrationForm.module.css";
import Form from "../UI/Form/Form";
import { useRef, useState, useContext } from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import { useUserAuth } from "../../store/AuthProvider";

export const RegistrationForm = (props) => {
  const {signUp} = useUserAuth();
  // const authCtx = useContext();
  const inputNameRef = useRef();
  const inputUsernameRef = useRef();
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const [inputNameValid, setInputNameValid] = useState(true);
  const [inputUsernameValid, setInputUsernameValid] = useState(true);
  const [inputPasswordValid, setInputPasswordValid] = useState(true);
  const [inputEmailValid, setInputEmailValid] = useState(true);

  async function onSubmitHandler(event) {
    event.preventDefault();
    const enteredName = inputNameRef.current.value;
    const enteredEmail = inputEmailRef.current.value;
    const enteredUsername = inputUsernameRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;
    setInputNameValid(true);
    setInputEmailValid(true);
    setInputUsernameValid(true);
    setInputPasswordValid(true);

    if (enteredName.trim().length === 0) {
      setInputNameValid(false);
      return;
    }
    if (enteredEmail.trim().length === 0) {
      setInputEmailValid(false);
      return;
    }
    if (enteredUsername.trim().length === 0) {
      setInputUsernameValid(false);
      return;
    }
    if (enteredPassword.trim().length === 0) {
      setInputPasswordValid(false);
      return;
    }
    try{
      await signUp(enteredEmail, enteredPassword);
    } catch(err) {
      window.alert(err.message);
      console.log(err);
      return;
    };
    // try {
    //   await authCtx.signup(
    //     enteredName,
    //     enteredEmail,
    //     enteredPassword,
    //     enteredUsername
    //   );
    // } catch {
    //   console.log("err");
    //   return;
    // }
    props.onReg();
    return;
    // props.onAddToCart(enteredAmountNumber);
  }
  return (
    <React.Fragment>
      <Form>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <Input
            ref={inputNameRef}
            isValid={inputNameValid}
            label="Full Name"
            input={{
              id: "name",
              type: "text",
              maxlength: "30",
              title: "Please enter a non-empty Name",
            }}
          />
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
            ref={inputUsernameRef}
            isValid={inputUsernameValid}
            label="Username"
            input={{
              id: "username",
              type: "text",
              maxlength: "30",
              title: "Please enter an unused Username",
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
            <Button title="Register"></Button>
          </div>
        </form>
      </Form>
    </React.Fragment>
  );
};
