import React from "react";
import Card from "../components/Card";

import "../styles/page.css"

function Art() {
    document.body.style = 'background: whitesmoke;';
    return (
        <div className="page">
            <Card text="Hi this is Dev" />
            <p>
                <a href="/art/hungry-creature.html"> Pay a visit to the Hungry Creature </a> <br />
                <a href="/art/spatial-poetry.html"> Compose spatial poetry </a> <br />
            </p>
        </div>
    )
}

export default Art;
