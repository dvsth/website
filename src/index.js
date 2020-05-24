import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter, Route, NavLink } from "react-router-dom"

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>
  ,
  document.getElementById("root")
);