import classes from "./Input.module.css";
import React from 'react';

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label><br></br>
      <input ref={ref} className={`${!props.isValid && classes.invalid}`} {...props.input} />
    </div>
  );
});

export default Input;
