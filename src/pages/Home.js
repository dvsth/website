import React, { Component } from "react";

import "../styles/home.css";

import NavBar from "../components/NavBar";
import ThreeGraphics from "../graphics/graphics";

import Div100vh from "react-div-100vh";

class Home extends Component {

    render() {
        return (
            <div id="home">
                <Div100vh className="name" style={{top: '60rvh'}}>
                    <p className="hometext left">Dev<br />Seth</p>
                    <p className="hometext right">देव<br />सेठ</p>
                </Div100vh>
                <NavBar top={false}/>
                <ThreeGraphics />
                <div className="canvaswrapper">	</div>
            </div>
        )
    }
}

export default Home;