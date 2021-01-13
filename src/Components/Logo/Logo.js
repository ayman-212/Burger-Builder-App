import React from "react";
import burgerLogo from "../../Assets/Images/burgerLogo.png";
import classes from "./Logo.module.css"

const logo = (props) => (
    <div
        className={classes.Logo}
        style={{ height: props.height }}>
        <img src={burgerLogo} alt="My Burger" />
    </div>

);

export default logo;