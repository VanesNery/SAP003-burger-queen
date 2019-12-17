import React from 'react';

function Button (props){
  return (
  <button class= {props.class} onclick={props.handleClick}>{props.title}</button>
  )
};

export default Button;