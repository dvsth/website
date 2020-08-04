import React from "react";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";
import Div100vh from "react-div-100vh"

function NavBar(props) {

    if (props.top) {
        const navBarStyle = { top: '5rvh' }
        const navlinksStyle = { fontSize: 'min(5vmin, 18px)' }
        return (
            <Div100vh className="navheader" style={navBarStyle}>
                <div className="navheadername">
                    <NavLink exact to="/">
                        <span>DeV SeT•H
                            {/* <br />देव सेठ */}
                        </span>
                    </NavLink>
                </div>
                <div className="navlinks" style={navlinksStyle}>
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
        const navBarStyle = { fontSize: 'min(5vmin, 25px)' }
        return (
            // <Div100vh className="navheader">
                <div className="navlinks" style={navBarStyle}>
                    <NavLink exact to="/art">art</NavLink>
                    <NavLink exact to="/essays">essays</NavLink>
                    <NavLink exact to="/research">research</NavLink>
                    <NavLink exact to="/travel">travels</NavLink>
                    <NavLink exact to="/about">about</NavLink>
                </div>
            // </Div100vh>
        )
    }


}

export default NavBar;