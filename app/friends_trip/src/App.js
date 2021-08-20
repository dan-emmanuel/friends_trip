import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      

      <Switch>
          {/* <Route path="/login"> */}
            {/* <Login/> */}
          {/* </Route> */}
          <Route path="/">
            <Login/>
          </Route>
          <Route path="/users">
          </Route>
          
        </Switch>


    </div>
  );
}

export default App;
