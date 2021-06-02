import React from "react";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";
import Div100vh from "react-div-100vh"

function NavBar(props) {

    var textColor = (props.theme === "dark") ?
        { color: 'black' } : { color: 'rgba(255, 255, 255, 0.7)' };

    if (props.top) {
        const navBarStyle = { top: '0rvh' }
        const navlinksStyle = { fontSize: 'min(5vmin, 15px)' }
        console.log({ ...navBarStyle, ...textColor })
        return (
            <Div100vh className="navheader" style={{ ...navBarStyle, ...textColor }}>
                <div className="navheadername">
                    <NavLink exact to="/">
                        <span>DeV SeT•H
                            {/* <br />देव सेठ */}
                        </span>
                    </NavLink>
                </div>
                <div className="navlinks" style={{ ...navlinksStyle, ...textColor }}>
                    <NavLink exact to="/art">art</NavLink>
                    <NavLink exact to="/code">code</NavLink>
                    <NavLink exact to="/research">research</NavLink>
                    <NavLink exact to="/blog">blog</NavLink>
                    <NavLink exact to="/about">about</NavLink>
                </div>
            </Div100vh>
        )
    }
    else {
        const navBarStyle = { fontSize: 'min(5vmin, 21px)' }
        return (
            // <Div100vh className="navheader">
            <div className="navlinks" style={navBarStyle}>
                <NavLink exact to="/art">art</NavLink>
                <NavLink exact to="/code">code</NavLink>
                <NavLink exact to="/research">research</NavLink>
                <NavLink exact to="/blog">blog</NavLink>
                <NavLink exact to="/about">about</NavLink>
            </div>
            // </Div100vh>
        )
    }


}

export default NavBar;