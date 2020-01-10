import React from "react";
import { StyleSheet, css } from "aphrodite";

export default function Kitchen() {
  return (
    <div>
      <header className={css(styles.header)}>
        <img
          src="../images/Burguer Queen.png"
          alt="Burguer Queen - Aréa do Cozinheiro"
        />
        Aréa do Cozinheiro
      </header>
      <p className={css(styles.txt)}>Em Construção... Em Breve !</p>
    </div>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: "2px auto",
    padding: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "14px",
    color: "white"
  },
  buttonCard: {
    backgroundColor: "#77dd77",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    hover: {
      ":hover": {
        backgroundColor: "yellow"
      }
    },
    margin: "5px"
  },

  button: {
    backgroundColor: "#77dd77",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    hover: {
      ":hover": {
        backgroundColor: "yellow"
      }
    },
    margin: "10px"
  },

  card: {
    width: "40%",
    float: "left",
    border: "none",
    alignItems: "center",
    margin: "20px 5,5% 0% 5.5%"
  },

  order: {
    margin: "2px 5.5% 0% 5.5%",
    width: "40%",
    float: "left",
    border: "none",
    alignItems: "center",
    backgroundColor: "#1f231f",
    color: "white",
    size: "100px"
  },

  header: {
    margin: "2px auto",
    padding: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  txt: {
    color: "white",
    fontSize: "80px"
  }
});
