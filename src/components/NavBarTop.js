import React from "react";
import "../styles/navbartop.css";
import { NavLink } from "react-router-dom";

function NavBarTop() {

    return (
        <div className="navheader">
            {/* <div className="navheadername">
                <NavLink exact to="/"><span>Dev Seth</span></NavLink>
            </div> */}
            <div className="navnavlinks">
                <NavLink exact to="/art">art</NavLink>
                <NavLink exact to="/essays">essays</NavLink>
                <NavLink exact to="/research">research</NavLink>
                <NavLink exact to="/travel">travels</NavLink>
                <NavLink exact to="/about">about</NavLink>
            </div>
        </div>
    )
}

export default NavBarTop;