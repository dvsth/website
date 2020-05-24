import React from "react";
import ReactDOM from "react-dom";

import {
  Route,
  NavLink,
  HashRouter,
  Switch,
  useLocation
} from "react-router-dom";

import Art from "./pages/Art"
import Essays from "./pages/Essays";
import Research from "./pages/Research";
import Travel from "./pages/Travel";
import About from "./pages/About";
import Main from "./Main";
import { motion, AnimatePresence } from "framer-motion";
import NavBarFull from "./components/NavBarFull";
import AnimatedRoute from "./components/AnimatedRoute";

function App() {
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch key="mySwitch">
        <AnimatedRoute key="a" exact path="/" component={Main} />
        <AnimatedRoute key="b" exact path="/art" component={Art} />
        <AnimatedRoute key="c" exact path="/essays" component={Essays} />
        <AnimatedRoute key="d" exact path="/research" component={Research} />
        <AnimatedRoute key="e" exact path="/travel" component={Travel} />
        <AnimatedRoute key="f" exact path="/about" component={About} />
      </Switch>
    </AnimatePresence>
  )
}

export default App;