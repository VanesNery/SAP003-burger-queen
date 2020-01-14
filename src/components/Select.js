import React from "react";
import { StyleSheet, css } from "aphrodite";

export default function Select(props) {
  return(
    <>
    <label className={css(styles.input)}>Departamento: </label>
     <select className={props.className} onChange={props.onChange} defaultValue="Cargo">
      <option value="Hall">Salão</option>
      <option value="Kitchen">Cozinha</option>
    </select>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    margin:"1vw",
    display: "flex",
    size: "10vw",
    color: "white",
    height: "4vw",
  }
})