import React from "react";
import NavBar from "../components/NavBar";

function About() {
    return (
        <div>
            <p className="page-text">
                Hi, this is Dev!
                <br />
                <img 
                    alt="Me at Duke Chapel arches" 
                    src={require("../images/dev.jpg")}
                    width='300px' />
            </p>
        </div>
    )
}

export default About;
