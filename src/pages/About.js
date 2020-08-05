import React from "react";
import NavBar from "../components/NavBar";

function About() {
    return (
        <div>
            <NavBar top="true"/>
            <p>
                Hi, this is Dev!
                <img 
                    alt="Me at Duke Chapel arches" 
                    src={require("../images/dev-2019.jpg")}
                    width='50%' />
            </p>
        </div>
    )
}

export default About;
