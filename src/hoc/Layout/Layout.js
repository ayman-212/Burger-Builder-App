import React, { Component } from "react";
import Aux from "../Auxiliry/Auxilliry";
import classes from "./Layout.module.css";
import Toolbar from "../../Components/Navigation/Toolbar/Toolbar";
import Sidedrawer from "../../Components/Navigation/Sidedrawer/Sidedrawer"

class Layout extends Component {
    state = {
        showSidedrawer: false
    }

    sidedrawerClosedHandler = () => {
        this.setState({ showSidedrawer: false })
    }

    sideDrawerToogleHandler = () => {
        this.setState((prevState) => {
            return { showSidedrawer: !prevState.showSidedrawer }
        }
        )
    }
    render() {
        return (
            <Aux>
                <Toolbar drawerToogleClicked={this.sideDrawerToogleHandler} />
                <Sidedrawer
                    open={this.state.showSidedrawer}
                    closed={this.sidedrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;