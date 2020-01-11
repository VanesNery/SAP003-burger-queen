import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Kitchen from "./pages/Kitchen";
import Hall from "./pages/Hall";
import History from "./pages/History";
import Nav from "./components/Nav";
import './App.css';
import {StyleSheet, css} from 'aphrodite';

export default function App() {
  return (
    <Router>
      <div>
       <Nav />
        <Switch>
        <Route path="/Hall" component={Hall} />
        <Route path="/Kitchen" component={Kitchen} />
        <Route path="/History" component={History} />
        <Route path="/">
        <img  className={css(styles.header)}src='../images/Logo_BQ.png' alt='Burguer Queen'/>
        <p className={css(styles.txt)}> Bem Vindo! - Por Favor escolha uma opção</p>
        </Route>
        </Switch>
      </div>
    </Router>
  );
}

const styles = StyleSheet.create({
  txt:{
    color:'white',
    fontSize:'3vw',
    display: 'flex',
    justifyContent: 'center',
  },
  header:{
    margin: '2vw auto', 
    display: 'flex',
    justifyContent: 'left',
  }
})