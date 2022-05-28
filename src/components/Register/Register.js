import React from 'react'
import Button from '../UI/Button/Button'

export const Register = props => {
const clickHandler = () => {
    props.onRegisterButtonClick(true);
};
  return (
    <React.Fragment>
        <Button title="Register" onClick={clickHandler}/>
    </React.Fragment>
  )
}

