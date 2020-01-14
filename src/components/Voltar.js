import React from "react";
import { useHistory } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";

export default function Voltar() {
  const road = useHistory();
  return (
    <>
    <button className={css(styles.button)} onClick={() => road.push("/Hall")}>
      Voltar
    </button>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#77dd77",
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
