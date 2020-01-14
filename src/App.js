import "./App.css";
import React, { useEffect, useState } from "react";
import firebase from "./components/util/firebaseUtils";
import Kitchen from "./pages/Kitchen";
import Hall from "./pages/Hall";
import Login from "./pages/Login.js";
import History from "./pages/History";
import { Route } from "react-router-dom";
import Register from "./pages/Register.js";

export default function App() {
  const [tipo, setTipo] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userId => {
    
      if (userId) {
        console.log("mudou")
        firebase
        .firestore()
          .collection("users")
          .doc(userId.uid)
          .get()
          .then(userId => {
            if (userId.data().office === "Hall") {
              setTipo("Hall")
            } else {
              setTipo("Kitchen")
            }
          });
      } else {
        console.log("ninguem logado")
        setTipo("nenhum dos dois")
      }
    });
  }, []);

  console.log(tipo)

  return (
    <div>
      {tipo === "Hall" ? (
        <>
         <Route path="/Hall" component={Hall} />
         <Route path="/History" component={History} />
        </>
      ) : (tipo === "Kitchen" ? <Route path="/Kitchen" component={Kitchen} /> : (
        <>
          <Route exact path="/" component={Login} />
          <Route path="/Register" component={Register} />
        </>
      ))  
  }
    </div>
  );
}
