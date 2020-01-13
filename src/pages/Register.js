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
  const [office, setOffice] = useState("Hall");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const road = useHistory();

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
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
              name,
              office,
              email,
              password,
              userId: firebase.auth().currentUser.uid
            });
        })
        .then(() => {
          if (office === "Hall") {
            road.push("/Hall");
            growl({ text: "Olá !" + { name }, ...refresh });
          } else {
            road.push("/Kitchen");
            growl.success({ text: "Olá !" + { name }, ...refresh });
          }
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
      <ul className={css(styles.input)}>
        <Input
          value={name}
          placeholder="Nome"
          type="text"
          onChange={e => setName(e.target.value)}
        />
      </ul>
      <ul className={css(styles.input)}>
        <Select
          title="Escolha"
          onChange={e => setOffice(e.currentTarget.value)}
        />
      </ul>
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
        title="Voltar"
        handleClick={() => road.push("/")}/>
      <Button
        className={css(styles.button)}
        handleClick={() => authFirebase()}
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
