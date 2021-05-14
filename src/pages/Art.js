import React from "react";
import Card from "../components/Card";
import NavBar from "../components/NavBar";

import "../styles/page.css"

function Art() {
    return (
        <div className="page">
            <p className="page-text">
                <a href="/art/hungry-creature.html"> Pay a visit to the Hungry Creature </a> <br />
                <a href="/art/spatial-poetry.html"> Compose spatial poetry </a> <br />
            </p>
        </div>
    )
}

export default Art;
