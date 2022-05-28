import classes from './Button.module.css';
import React from 'react';

function Button(props) {
const clickHandler = () => {
    props.onClick(true);
};
  return (
    <button className={classes.button} onClick={clickHandler}>{props.title}</button>
  )
}

export default Button