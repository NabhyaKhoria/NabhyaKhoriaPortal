import React from 'react'
import Button from '../UI/Button/Button'

export const Edit = (props) => {
    const clickHandler = () => {
        props.onEditButtonClick(true);
    };
  return (
    <React.Fragment>
        <Button title="Edit" onClick={clickHandler}/>
    </React.Fragment>
  )
}

