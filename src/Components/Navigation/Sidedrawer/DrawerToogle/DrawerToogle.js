import React from "react";
import classes from "./DrawerToogle.module.css"

const drawerToogle = (props) => (
    <div onClick={props.clicked} className={classes.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToogle