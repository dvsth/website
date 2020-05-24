import React from "react";
import "../styles/navbarfull.css";
import { NavLink } from "react-router-dom";

function NavBarFull() {

    return (
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
    )
}

export default NavBarFull;