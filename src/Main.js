import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

import Art from "./pages/Art"
import Essays from "./pages/Essays";
import Research from "./pages/Research";
import Travel from "./pages/Travel";
import About from "./pages/About";

import "./styles/main.css";

class Main extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <div className="header">
                        <div className="headername">
                            <NavLink exact to="/"><span>Dev Seth</span></NavLink>
                        </div>
                        <div className="navlinks">
                            <NavLink exact to="/art">art</NavLink>
                            <NavLink exact to="/essays">essays</NavLink>
                            <NavLink exact to="/research">research</NavLink>
                            <NavLink exact to="/travel">travels</NavLink>
                            <NavLink exact to="/about">about</NavLink>
                        </div>
                    </div>
                    <div className="body">
                        <Route exact path="/art" component={Art}></Route>
                        <Route exact path="/essays" component={Essays}></Route>
                        <Route exact path="/research" component={Research}></Route>
                        <Route exact path="/travel" component={Travel}></Route>
                        <Route exact path="/about" component={About}></Route>
                    </div>
                </HashRouter>
            </div>
        );
    }
}

export default Main;