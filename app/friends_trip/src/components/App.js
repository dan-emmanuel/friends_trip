import { Switch, Route, Link } from "react-router-dom";
import Signup from "./Signup";

function App() {
  return (
    < >
        <Switch>
          {/* <Route path="/login"> */}
          {/* <Login/> */}
          {/* </Route> */}
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/users">
          </Route>

        </Switch>


    </>
  );
}

export default App;
