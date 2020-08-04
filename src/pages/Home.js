import React, { Component } from "react";

import "../styles/home.css";

import NavBar from "../components/NavBar";
import ThreeGraphics from "../graphics/graphics";

import Div100vh from "react-div-100vh";

class Home extends Component {

    render() {
        return (
            <div id="home">
                <Div100vh id="homemenu" style={{ top: '70rvh' }}>
                    <div className="name">
                        <p className="hometext left">DeV SeT•H</p>
                        {/* <p className="hometext right">देव<br />सेठ</p> */}
                    </div>
                    <NavBar top={false} />
                </Div100vh>
                <ThreeGraphics />
                <div className="canvaswrapper">	</div>
            </div>
        )
    }
}

export default Home;