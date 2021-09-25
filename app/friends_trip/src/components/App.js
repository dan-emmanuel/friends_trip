import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import React, { useEffect } from 'react';
import { checkConnected } from "../redux/actions/authActions"
import Signup from "./Signup";
import Signin from "./Signin";
import Home from "./Home.js";
import Shell from "./Shell";
import "./main.css"

function App(props) {
  let { checkConn } = props
  useEffect(() => {
    checkConn()
  })

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

let mapDispatchToProps = (dispatch => {
  return {
    checkConn: () => dispatch(checkConnected()),
  };
})
export default connect(null, mapDispatchToProps)(App);
