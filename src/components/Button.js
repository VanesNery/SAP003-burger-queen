import React from "react";

export default function Button(props) {
  return (
    <button
      key={props.id}
      className={props.className}
      onClick={props.handleClick}
    >
      <p>{props.title}</p>
      <p>{props.price}</p>
    </button>
  );
}
