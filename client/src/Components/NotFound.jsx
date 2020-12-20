import React from "react";
import notFound from "../Assets/404.png";
import "../Styles/App.css";

function NotFound() {
    return (
        <div id="form-container">
            <img src={notFound} alt="" id="notFound" />
            <br />
            <a href="/">Home</a>
        </div>
    );
}

export default NotFound;
