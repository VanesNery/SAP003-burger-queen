import React from "react";
import { useHistory } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import growl from "growl-alert";
import "growl-alert/dist/growl-alert.css";
import firebase from "../components/util/firebaseUtils";

const refresh = {
  fadeAway: true,
  fadeAwayTimeOut: 500
};

export default function Exit() {
  const road = useHistory();

  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(road.push("/"))
      .catch(() => {
        growl.error({ text: "Ocorreu um erro ao tentar sair", ...refresh });
      });
  };

  return (
    <button className={css(styles.button)} handleClick={logOut}>
      Sair
    </button>
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
