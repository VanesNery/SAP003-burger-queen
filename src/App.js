import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Kitchen from "./pages/Kitchen";
import Hall from "./pages/Hall";
import Nav from "./components/Nav";
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
        <header>
        <img className={css(styles.header)} src='../Burguer Queen.png' alt='Burguer Queen' width='150' />
        </header>
        <p className={css(styles.txt)}> Bem Vindo ao Burguer<br />Por Favor escolha uma opção</p>
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
  header:{
    margin: '2px auto', 
    padding: '5px',
    display: 'flex',
    justifyContent: 'left',
  }
})