import React from "react";
import Card from "../components/Card";
import NavBar from "../components/NavBar";

import "../styles/infopage.css"

function Art() {
    return (
        <div className="page">
            <NavBar top="true"/>
            <Card text="Hi this is Dev" />
            <p>
                <a href="/art/hungry-creature.html"> Pay a visit to the Hungry Creature </a> <br />
                <a href="/art/spatial-poetry.html"> Compose spatial poetry </a> <br />
            </p>
        </div>
    )
}

export default Art;
