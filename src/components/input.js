import React from 'react';

export default function Input(props) {
  return (
    <input placeholder={props.placeholder} title={props.title} type={props.type}/>
  )
};