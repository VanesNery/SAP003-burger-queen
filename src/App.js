import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Kitchen from "./pages/kitchen";
import Hall from "./pages/hall";
import Nav from "./components/nav";
import './App.css';
import {StyleSheet, css} from 'aphrodite';

export default function App() {
  return (
    <Router>
      <div>
       <Nav />
        <Switch>
        <Route path="/hall" component={Hall} />
        <Route path="/kitchen" component={Kitchen} />
        <Route path="/">
        <p className={css(styles.txt)}>Escolha uma opção</p>
        </Route>
        </Switch>
      </div>
    </Router>
  );
}

const styles = StyleSheet.create({
  txt:{
    color:'white',
    fontSize:'80px',
  },
})