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
          console.log(userId)
          firebase
            .firestore()
            .collection("users")
            .doc(userId.user.uid)
            .get()
            .then( doc => {
              if(doc.data().office === "Kitchen"){
                road.push("/Kitchen");
              } else {
                road.push("/Hall", "/History");
              }
            }
          );
        })
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
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
      </ul>
      <div className={css(styles.div)}>
      <Button
        className={css(styles.button)}
        title="Login"
        handleClick={() => login()}/>
      <Button
        className={css(styles.button)}
        handleClick={() => road.push("/Register")}
        title="Registra-se"
      />
      </div>
    </main>
  );
}

const styles = StyleSheet.create({
  input: {
    margin: "auto auto 1vw",
    display: "flex",
    justifyContent: "center",
    borderRadius: "10vw",
    color: "white",
    height: "4vw",
  },

  button: {
    backgroundColor: "#77dd77",
    fontSize: "1vw",
    fontWeight: "bold",
    padding: "0.5vw",
    borderRadius: "1vw",
    cursor: "pointer",
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

  div: {
    display: "flex",
    alignItems: "center",
    width: "100vw",
    padding: "0.5vw",
    margin: "auto 45vw"
  },

  header: {
    margin: "2vw auto",
    display: "flex",
    fontSize: "4vw",
    justifyContent: "center"
  }
});
