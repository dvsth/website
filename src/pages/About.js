import React from "react";
import Card from "../components/Card"

import "../styles/page"

function About() {
    document.body.style = 'background: whitesmoke;';
    return (
        <div className="page">
                <p>
                    Hi, this is Dev!
                    <img
                        alt="Me at Duke Chapel arches"
                        src={require("../images/dev-2019.jpg")}
                        width='400px'
                    />
                </p>
        </div>
    )
}

export default About;
