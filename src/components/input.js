import React from 'react';

function Input(props) {
  return (
    <input class= {props.class} placeholder= {props.placeholder} type= {props.type}/>
  )
};
    
export default Input;