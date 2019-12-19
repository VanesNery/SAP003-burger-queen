import React from 'react';

export default function Card (props){
  return (
    <button onClick={props.handleClick}>
      <p>{props.name}</p>
      <p>R${props.price},00</p>
    </button>
  );
}