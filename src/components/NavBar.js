import React from "react";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";
import Div100vh from "react-div-100vh"

function NavBar(props) {
    
    if(props.top){
        const navBarStyle = {top: '5rvh'}
        return (
            <Div100vh className="navheader" style={navBarStyle}>
                <div className="navheadername">
                    <NavLink exact to="/"><span>Dev Seth<br />देव सेठ</span></NavLink>
                </div>
                <div className="navlinks">
                    <NavLink exact to="/art">art</NavLink>
                    <NavLink exact to="/essays">essays</NavLink>
                    <NavLink exact to="/research">research</NavLink>
                    <NavLink exact to="/travel">travels</NavLink>
                    <NavLink exact to="/about">about</NavLink>
                </div>
            </Div100vh>
        )
    }
    else {
        const navBarStyle = {top: '80rvh'}
        return (
            <Div100vh className="navheader" style={navBarStyle}>
                <div className="navlinks">
                    <NavLink exact to="/art">art</NavLink>
                    <NavLink exact to="/essays">essays</NavLink>
                    <NavLink exact to="/research">research</NavLink>
                    <NavLink exact to="/travel">travels</NavLink>
                    <NavLink exact to="/about">about</NavLink>
                </div>
            </Div100vh>
        )
    }


}

export default NavBar;