import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Kitchen from "./pages/kitchen";
import Hall from "./pages/hall";
import Nav from "./components/nav"
import './App.css'

export default function App() {
  return (
    <Router>
      <div>
       <Nav />
        <Switch>
          <Route path="/hall" component={Hall} />
          <Route path="/kitchen" component={Kitchen} />
          <Route path="/">
            <p>Escolha um link</p>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}