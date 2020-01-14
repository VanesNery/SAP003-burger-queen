import React from "react";
import { useHistory } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import "growl-alert/dist/growl-alert.css";
import Exit from "./Exit";

export default function Voltar() {
  const road = useHistory();
  return (
    <>
    <button className={css(styles.button)} onClick={() => road.push("/History")}>
      Pedidos
    </button>
    <Exit />
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#77dd77",
    display: "flex",
    alignItems: "flex-end",
    fontWeight: "bold",
    padding: "1.5vw",
    border: "none",
    borderRadius: "1vw",
    cursor: "pointer",
    ":active": {
      backgroundColor: "yellow"
    }
  }
});
