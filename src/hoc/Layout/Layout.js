import React, { Component } from "react";
import { connect } from "react-redux"

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
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToogleClicked={this.sideDrawerToogleHandler} />
                <Sidedrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSidedrawer}
                    closed={this.sidedrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);