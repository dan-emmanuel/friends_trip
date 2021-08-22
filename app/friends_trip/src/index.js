import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import logger from "redux-logger";
import rootReducer from "./redux/reducers/rootReducer";
import 'bootstrap/dist/css/bootstrap.min.css'
const mystore = createStore(rootReducer, applyMiddleware(logger,thunk));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={mystore}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

