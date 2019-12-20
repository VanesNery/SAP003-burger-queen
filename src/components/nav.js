import React from "react";
import { Link } from "react-router-dom";

export default function Nav (){
    return(
        <>
          <button>
            <Link to="/hall">Garçom</Link>
          </button>
          <button>
            <Link to="/kitchen">Cozinha</Link>
          </button>
          <button>
            <Link to="/">Home</Link>
          </button>
          </>
    )
}