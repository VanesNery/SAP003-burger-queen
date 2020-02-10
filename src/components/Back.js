import React from "react";
import { useHistory } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";

export default function Back() {
  const road = useHistory();
  return (
    <button className={css(styles.button)} onClick={() => road.push("/Hall")}>
      Voltar
    </button>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#77dd77",
    margin: "2vw",
    height: "5vw",
    float: "right",
    width: "10vw",
    fontWeight: "bold",
    padding: "1.5vw",
    borderRadius: "1vw",
    cursor: "pointer",
    ":active": {
      backgroundColor: "yellow"
    }
  }
});
