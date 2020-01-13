import React from "react";

export default function Select(props) {
  return(
  <div className={props.className}>
    <label className={props.className} key={props.id}>{props.title}: </label>
    <select className={props.className} onChange={props.onChange} defaultValue="Cargo">
      <option disabled>Cargo</option>
      <option value="Hall">Salão</option>
      <option value="Kitchen">Cozinha</option>
    </select>
  </div>
  );
}