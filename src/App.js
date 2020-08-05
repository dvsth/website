import React from "react";

import { Switch } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AnimatedRoute from "./components/AnimatedRoute";

import Art from "./pages/Art"
import Writings from "./pages/Writings";
import Research from "./pages/Research";
import Code from "./pages/Code";
import About from "./pages/About";
import Home from "./pages/Home";

function App() {
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch key="mySwitch">
        <AnimatedRoute key="a" exact path="/" component={Home} />
        <AnimatedRoute key="b" exact path="/art" component={Art} />
        <AnimatedRoute key="c" exact path="/writings" component={Writings} />
        <AnimatedRoute key="d" exact path="/research" component={Research} />
        <AnimatedRoute key="e" exact path="/code" component={Code} />
        <AnimatedRoute key="f" exact path="/about" component={About} />
        <AnimatedRoute key="g" path="/" component={Home} />
      </Switch>
    </AnimatePresence>
  )
}

export default App;