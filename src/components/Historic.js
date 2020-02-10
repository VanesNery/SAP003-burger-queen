import React from "react";
import { useHistory } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import "growl-alert/dist/growl-alert.css";

export default function Voltar() {
  const road = useHistory();
  return (
    <button className={css(styles.button)} onClick={() => road.push("/History")}>
      Pedidos
    </button>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#77dd77",
    margin: "2vw",
    height: "5vw",
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
