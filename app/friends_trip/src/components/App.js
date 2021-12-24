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
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/event/event">
            <Home />
          </Route>
          <Route path="/event/calendar">
            <Home />
          </Route>
          <Route path="/event/map">
            <Home />
          </Route>
          <Route path="/event/bill">
            <Home />
          </Route>
          <Route path="/event/params">
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
