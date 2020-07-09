import React from "react"
import ReactDOM from "react-dom"
import { HashRouter, Route, NavLink } from "react-router-dom"

import App from "./App"

console.log("hiiii")
ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);
