import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import growl from "growl-alert";
import "growl-alert/dist/growl-alert.css";
import firebase from "../components/util/firebaseUtils";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";

export default function Register() {
  const [name, setName] = useState("");
  const [office, setOffice] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const road = useHistory("");

  const refresh = {
    fadeAway: true,
    fadeAwayTimeout: 2000
  };

  const authFirebase = () => {
    if (name.length > 0) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
              name,
              office,
              email,
              password,
              userId: firebase.auth().currentUser.uid
            })
            .then(() => {
              growl.success({ text: "Seu cadastro foi efetuado", ...refresh });
              if (office === "Hall") {
                road.push("/Hall");
              } else {
                road.push("/Kitchen");
              }
            });
        })
        .catch(error => {
          const errorCode = error.code;
          if (errorCode === "auth/email-already-in-use") {
            growl.error({ text: "Esse email já possui conta", ...refresh });
          } else if (errorCode === "auth/invalid-email") {
            growl.error({ text: "Email inválido", ...refresh });
          } else if (errorCode === "auth/weak-password") {
            growl.error({
              text: "A senha precisa ter 6 caracteres ou mais",
              ...refresh
            });
          }
        });
    } else {
      growl.warning({ text: "Coloque o nome", ...refresh });
    }
  };

  return (
    <main>
      <img
        className={css(styles.header)}
        src="../images/Logo_BQ.png"
        alt="Burguer Queen"
      />
      <p className={css(styles.txt)}>Bem Vindo! Faça seu Registro</p>
      <div className={css(styles.divInput)}>
        <Input
          className={css(styles.input)}
          value={name}
          placeholder="Nome"
          type="text"
          onChange={e => setName(e.target.value)}
        />
        <Select
          className={css(styles.select)}
          onChange={e => setOffice(e.currentTarget.value)}
        />
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
      </div>
      <div className={css(styles.divButton)}>
        <Button
          className={css(styles.button)}
          title="Voltar"
          handleClick={() => road.push("/")}
        />
        <Button
          className={css(styles.button)}
          handleClick={() => authFirebase()}
          title="Registrar"
        />
      </div>
    </main>
  );
}

const styles = StyleSheet.create({
  divInput: {
    margin: "auto",
    display: "grid",
    justifyContent: "center",
    borderRadius: "10vw",
    color: "white",
    height: "8vw",
    width: "1vw"
  },

  input: {
    padding: "1vw",
    margin: "0.5vw"
  },

  button: {
    margin: "1vw",
    width: "12vw",
    height: "9vw",
    backgroundColor: "#77dd77",
    fontSize: "0.8em",
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
    justifyContent: "center",
    margin: "-3vw 0vw 1vw"
  },

  divButton: {
    display: "flex",
    alignItems: "center",
    width: "25vw",
    padding: "0.5vw",
    margin: "13.5vw auto",
    height: "10vw"
  },

  header: {
    margin: "3vw auto 1vw",
    display: "flex",
    fontSize: "4vw",
    justifyContent: "center"
  },

  select: {
    display: "flex",
    justifyContent: "center",
    size: "7vw",
    color: "black",
    height: "4vw"
  }
});
