import React from "react";

import { Switch, Route, HashRouter } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedRoute from "./components/AnimatedRoute";

import Art from "./pages/Art"
import Writings from "./pages/Writings";
import Research from "./pages/Research";
import Code from "./pages/Code";
import About from "./pages/About";
import Home from "./pages/Home";

import NavBar from "./components/NavBar"

function App() {
  return (
    <AnimatePresence>
      <Switch key="mySwitch">
        <AnimatedRoute key="a" exact path="/" component={Home} />
        <motion.div
          key="x"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.5 }}>
          <NavBar key="b" top="true" />
        </motion.div>
      </Switch>
      <Switch key = "mySwitch2">
        <AnimatedRoute key="c" exact path="/art" component={Art} />
        <AnimatedRoute key="d" exact path="/writings" component={Writings} />
        <AnimatedRoute key="e" exact path="/research" component={Research} />
        <AnimatedRoute key="f" exact path="/code" component={Code} />
        <AnimatedRoute key="g" exact path="/about" component={About} />
        {/* <AnimatedRoute key="g" path="/" component={Home} /> */}
      </Switch>
    </AnimatePresence>
  )
}

export default App;