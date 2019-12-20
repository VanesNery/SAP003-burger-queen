import React from 'react';

export default function Button (props){
  return (
  <button data-id={props.id} className={props.className} onClick={props.handleClick}>{props.title}</button>
  )
};