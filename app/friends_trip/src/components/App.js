import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import React from 'react';

import Signup from "./Signup";
import Signin from "./Signin";
import Home from "./Home.js";
import Shell from "./Shell";


function App(props) {
  

  return (
    < >
    <Shell>
      <Switch>

        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Signin />
        </Route>

          <Route path="/home">
            <Home />
          </Route>
        
      </Switch>
    </Shell>

    </>
  );
}


export default connect(null, null)(App);
