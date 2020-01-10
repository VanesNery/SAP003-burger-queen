import React from "react";
import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";

export default function Nav() {
  return (
    <>
      <button className={css(styles.button)}>
        <Link to="/">Home</Link>
      </button>
      <button className={css(styles.button)}>
        <Link to="/Hall">Garçom</Link>
      </button>
      <button className={css(styles.button)}>
        <Link to="/Kitchen">Cozinha</Link>
      </button>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: "3px",
    backgroundColor: "#77dd77",
    fontSize: "12px",
    fontWeight: "bold",
    padding: "15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    ":active": {
      backgroundColor: "yellow"
    }
  }
});
