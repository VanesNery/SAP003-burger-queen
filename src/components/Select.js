import React from "react";

export default function Select(props) {
  return(
    <>
     <select className={props.className} onChange={props.onChange} defaultValue="Cargo">
      <option value="">Departamento</option>
      <option value="Hall">Salão</option>
      <option value="Kitchen">Cozinha</option>
    </select>
    </>
  );
}
