import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import growl from "growl-alert";
import "growl-alert/dist/growl-alert.css";
import firebase from "../components/util/firebaseUtils";
import Button from "../components/Button";
import Input from "../components/Input";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const refresh = {
    fadeAway: true,
    fadeAwayTimeout: 500
  };

  const login = () => {
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => {
          const errorCode = error.code;
          if (errorCode === "auth/wrong-password") {
            growl.error({ text: "Senha inválida", ...refresh });
          } else if (errorCode === "auth/invalid-email") {
            growl.error({ text: "Email não registrado", ...refresh });
          } else if (errorCode === "auth/invalid-email") {
            growl.error({text: "Formato do email inválido", ...refresh});
          }
        });
  };

  return (
    <main>
      <img
        className={css(styles.header)}
        src="../images/Logo_BQ.png"
        alt="Burguer Queen"
      />
      <p className={css(styles.txt)}>Bem Vindo! Faça seu Login</p>
      <ul className={css(styles.input)}>
        <Input
          value={email}
          placeholder="Email"
          type="email"
          onChange={e => setEmail(e.target.value)}
        />
      </ul>
      <ul className={css(styles.input)}>
        <Input
          value={password}
          placeholder="Senha"
          type="text"
          onChange={e => setPassword(e.target.value)}
        />
      </ul>
      <Button
        className={css(styles.button)}
        title="Login"
        handleClick={() => login()}/>
      <Button
        className={css(styles.button)}
        handleClick={() => history.push("/")}
        title="Registra-se"
      />
    </main>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: "auto auto 1vw",
    display: "flex",
    justifyContent: "center",
    size: "10vw",
    color: "white"
  },

  button: {
    backgroundColor: "#77dd77",
    fontSize: "1vw",
    fontWeight: "bold",
    padding: "0.5vw",
    borderRadius: "1vw",
    cursor: "pointer",
    display: "flex",
    justifyContent: "left",
    margin: "auto 45vw",
    ":active": {
      backgroundColor: "yellow"
    }
  },

  txt: {
    color: "white",
    fontSize: "3vw",
    display: "flex",
    justifyContent: "center"
  },

  header: {
    margin: "2vw auto",
    display: "flex",
    fontSize: "4vw",
    justifyContent: "center"
  }
});
