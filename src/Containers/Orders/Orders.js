import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios-orders"
import Order from "../../Components/Order/Order";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        return (
            <div>
                {this.props.loading ? <Spinner /> : this.props.orders.map(order => <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
                )}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));