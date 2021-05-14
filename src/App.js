import React from "react";

import { Switch, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AnimatedRoute from "./components/AnimatedRoute";

import Art from "./pages/Art"
import Writings from "./pages/Writings";
import Research from "./pages/Research";
import Code from "./pages/Code";
import About from "./pages/About";
import Home from "./pages/Home";

import NavBar from "./components/NavBar"

import "./styles/styles.css"

function App() {
  return (
    <AnimatePresence exitBeforeEnter>
      <Route>
        <Switch key="mySwitch">
          <AnimatedRoute key="a" exact path="/" component={Home} />
          <NavBar top="true" />
        </Switch>
        <AnimatedRoute exact path="/art" component={Art} />
        <AnimatedRoute exact path="/writings" component={Writings} />
        <AnimatedRoute exact path="/research" component={Research} />
        <AnimatedRoute exact path="/code" component={Code} />
        <AnimatedRoute exact path="/about" component={About} />
        {/* <AnimatedRoute key="g" path="/" component={Home} /> */}
      </Route>
    </AnimatePresence>
  )
}

export default App;