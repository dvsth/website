import React, { Component } from "react";

import "../styles/home.css";

import NavBarTop from "../components/NavBarTop";
import ThreeGraphics from "../graphics/graphics"

class Home extends Component {

    // componentDidMount() {
    //     require('../graphics/graphics.js')
    //     var tag = document.createElement('script');
    //     tag.async = true;
    //     tag.id = "threecanvas";
    //     tag.type = "text/javascript"
    //     tag.src = "../graphics/graphics.js";
    //     document.body.appendChild(tag);
    //     console.log(tag)
    //     console.log("COMPONENT DID!!! mount")
    // }

    // componentWillUnmount() {
    //     var element = document.getElementById("threecanvas");
    //     element.parentNode.removeChild(element);
    // }

    render() {
        return (
            <div id="home">
                <div className="name">
                    <p className="left">DEV<br />देव</p>
                    <p className="right">SETH<br />सेठ</p>
                </div>
                <NavBarTop />
                <ThreeGraphics />
                <div className="canvaswrapper">	</div>
            </div>
        )
    }
}

export default Home;