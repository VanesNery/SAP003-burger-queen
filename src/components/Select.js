import React from "react";
import { StyleSheet, css } from "aphrodite";

export default function Select(props) {
  return(
    <>
     <select className={css(styles.input)} onChange={props.onChange} defaultValue="Cargo">
      <option value="">Departamento</option>
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
    height: "4vw",
  }
})