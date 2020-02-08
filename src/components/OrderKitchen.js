import React from "react";
import { StyleSheet, css } from "aphrodite";
import Button from "../components/Button";

export default function Order(props) {
  return (
    <div className={props.className}>
      <p>{props.name}</p>
      <p>{props.desk}</p>
      <p>{props.itens}</p>
      <p>{props.time}</p>
      <p>{props.finalTime}</p>
      <p>{props.status}</p>
      <p>
        <Button
          className={css(styles.button)}
          handleClick={props.onClick}
          title={props.title}
        />
      </p>
    </div>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#77dd77",
    fontSize: "11px",
    fontWeight: "bold",
    padding: "1vw",
    borderRadius: "1vw",
    cursor: "pointer",
    ":active": {
      backgroundColor: "yellow"
    }
  }
});
