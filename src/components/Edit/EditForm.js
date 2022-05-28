import React from "react";
import classes from "./EditForm.module.css";
import Form from "../UI/Form/Form";
import { useRef, useState, useContext } from "react";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import { auth } from "../../firebase/firebase2";
import { useUserAuth } from "../../store/AuthProvider";

export const EditForm = (props) => {
  const inputPhotoRef = useRef();
  const inputUsernameRef = useRef();
  const [inputUsernameValid,setInputUsernameValid] = useState(true);
  const [inputPhotoValid,setInputPhotoValid] = useState(true);
  const authCtx = useContext(AuthContext);
  const { editProfile} = useUserAuth();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let enteredPhoto = inputPhotoRef.current.value;
    const enteredUsername = inputUsernameRef.current.value;
    setInputPhotoValid(true);
    setInputUsernameValid(true);

    if (enteredPhoto.trim().length === 0) {
        enteredPhoto = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
    }
    if (enteredUsername.trim().length === 0) {
        setInputUsernameValid(false);
      return;
    }
    try {
      await editProfile(enteredPhoto, enteredUsername);
      props.onLogin();
    } catch (err) {
      window.alert(err.message);
      console.log(err);
      return;
    }
    // authCtx.onLogin();
    props.onEdit();
    return;
  };
  return (
    <React.Fragment>
      <Form>
        <form className={classes.form} onSubmit={onSubmitHandler}>
          <Input
            ref={inputPhotoRef}
            isValid={inputPhotoValid}
            label="Profile Photo URL"
            input={{
              id: "photoURL",
              type: "url",
              title: "Please enter a valid photo URL"
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
              minlength: "4",
              title: "Username cannot be empty"
            }}
          />

          <div className={classes["form-button"]}>
            <Button title="Edit"></Button>
          </div>
        </form>
      </Form>
    </React.Fragment>
  );
};
