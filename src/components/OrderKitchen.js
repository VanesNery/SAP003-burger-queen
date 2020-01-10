import React from "react";
import { StyleSheet, css } from "aphrodite";
import Button from "../components/Button";

export default function Order(props) {
  return (
    <div className={props.className}>
      <span>{props.name}</span>
      <span>{props.desk}</span><br />
      <span>{props.itens}</span>
      <span>{props.time}</span><br />
      <span>{props.status}</span>
      <Button
        className={css(styles.button)}
        onClick={() => props.onClick(props)}
        title="Oi"
      />
    </div>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#77dd77",
    fontSize: "11px",
    fontWeight: "bold",
    padding: "1vw",
    border: "none",
    borderRadius: "1vw",
    cursor: "pointer",
    ":active": {
      backgroundColor: "yellow"
    }
  }
});
