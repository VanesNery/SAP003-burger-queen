import React from "react";
import { Link } from "react-router-dom";

export default function Nav (){
    return(
        <nav>
             <ul>
          <li>
            <Link to="/hall">Garçom</Link>
          </li>
          <li>
            <Link to="/kitchen">Cozinha</Link>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
        </nav>
    )
}