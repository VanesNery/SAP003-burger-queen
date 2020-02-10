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
  const road = useHistory();

  const refresh = {
    fadeAway: true,
    fadeAwayTimeout: 2000
  };

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userId => {
        firebase
          .firestore()
          .collection("users")
          .doc(userId.user.uid)
          .get()
          .then(doc => {
            growl.success({ text: "Login foi efetuado", ...refresh });
            if (doc.data().office === "Kitchen") {
              road.push("/Kitchen");
            } else {
              road.push("/Hall", "/History");
            }
          });
      })
      .catch(error => {
        const errorCode = error.code;
        if (errorCode === "auth/wrong-password") {
          growl.error({ text: "Senha inválida", ...refresh });
        } else if (errorCode === "auth/invalid-email") {
          growl.error({ text: "Email não registrado", ...refresh });
        } else if (errorCode === "auth/invalid-email") {
          growl.error({ text: "Formato do email inválido", ...refresh });
        }
      });
  };

  return (
    <main className={css(styles.main)}>
      <aside className={css(styles.side)}>
        <img 
        className={css(styles.img)}
        src="../images/Logo_BQ.png" alt="Burguer Queen" />
      </aside>
      <aside className={css(styles.form)}>
        <Input
          className={css(styles.input)}
          value={email}
          placeholder="Email"
          type="email"
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          className={css(styles.input)}
          value={password}
          placeholder="Senha"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          className={css(styles.button)}
          title="Login"
          handleClick={() => login()}
        />
        <Button
          className={css(styles.button)}
          handleClick={() => road.push("/Register")}
          title="Registrar"
        />
      </aside>
    </main>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: "32vw 8vw 3vw 1vw",
    color: "white",
    width: "32vw"
  },

  input: {
    alignItems: "center",
    padding: "1vw",
    margin: "0.5vw",
    borderRadius: "6vw",
    width: "27vw",
    height: "4vw"
  },

  button: {
    alignItems: "center",
    margin: "0.5vw 6vw",
    width: "18vw",
    height: "6vw",
    backgroundColor: "#77dd77",
    fontSize: "0.8em",
    fontWeight: "bold",
    borderRadius: "5vw",
    cursor: "pointer",
    ":active": {
      backgroundColor: "yellow"
    }
  },

  side: {
    width: "40vw",
    padding: "0.5vw",
    margin: "14vw",
    height: "5vw"
  },

  main: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "90vw",
    height: "42vw",
    justifyContent: "space-around"
  }
});
