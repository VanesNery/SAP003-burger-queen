import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Kitchen from "./pages/kitchen";
import Hall from "./pages/hall";

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
          <Link to="/hall">Garçom</Link>
          </li>
          <li>
            <Link to="/kitchen">Cozinha</Link>
          </li>
        </ul>
            <Switch>
            <Route path="/hall">
            <Hall />
          </Route>
           <Route path="/kitchen">
            <Kitchen />
          </Route>
        </Switch>
        </div>
    </Router>
  );
}