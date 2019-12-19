import React from 'react';

export default function Button (props){
  return (
  <button data-id={props.id} onClick={props.handleClick}>{props.title}</button>
  )
};