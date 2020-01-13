import "./App.css";
import React, { useEffect } from "react";
import firebase from "./components/util/firebaseUtils";
import Kitchen from "./pages/Kitchen";
import Hall from "./pages/Hall";
import Register from "./pages/Register";
import Login from "./pages/Login.js";
import { Route, useHistory } from 'react-router-dom';

export default function App() {
  const history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then(snapShot => {
            const perfil = snapShot.data();
            if (perfil.office === "Hall") {
              history.push("/Hall");
            } else {
              history.push("/Kitchen");
            }
          });
      } else {
        history.push("/");
      }
    });
  }, [history]);

  return (
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/Hall" component={Hall} />
      <Route path="/Kitchen" component={Kitchen} />
      <Route path="/Register" component={Register} />
    </div>
  );
}
