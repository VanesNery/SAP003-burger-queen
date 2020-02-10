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
      <aside className={css(styles.main)}>
        <img
          className={css(styles.img)}
          src="../images/Logo_BQ.png"
          alt="Burguer Queen"
        />
      </aside>
      <aside className={css(styles.divInput)}>
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
        <Button
          className={css(styles.button)}
          handleClick={() => authFirebase()}
          title="Registrar"
        />
        <Button
          className={css(styles.button)}
          title="Voltar"
          handleClick={() => road.push("/")}
        />
      </aside>
    </main>
  );
}

const styles = StyleSheet.create({
  divInput: {
    borderRadius: "10vw",
    color: "white",
    margin: "-25vw 8vw 3vw 1vw",
    width: "32vw",
    float: "right"
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

  divButton: {
    width: "25vw",
    padding: "0.5vw",
    margin: "13.5vw auto",
    height: "10vw"
  },

  select: {
    backgroundColor: "#77dd77",
    size: "7vw",
    borderRadius: "3vw",  
    color: "black",
    height: "4vw",
    margin: "0.5vw 6vw",
  },

  main: {
    width: "30vw",
    height: "5vw",
    padding: "0.5vw",
    margin: "19vw 8vw"
  }
});
