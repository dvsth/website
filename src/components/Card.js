import React from "react";
import "../styles/card.css"

function Card(props) {
    return(
        <div className="card">
            <p>{props.text}</p>
        </div>
    )
}

export default Card;
