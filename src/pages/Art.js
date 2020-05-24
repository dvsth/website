import React from "react";
import Card from "../components/Card";
import NavBarFull from "../components/NavBarFull";

function Art() {
    return (
        <div className="page">
            <NavBarFull></NavBarFull>
            <Card text="Hi this is Dev" />
            <p>
                <a href="/art/hungry-creature.html"> Pay a visit to the Hungry Creature </a> <br />
                <a href="/art/spatial-poetry.html"> Compose spatial poetry </a> <br />
            </p>
        </div>
    )
}

export default Art;
