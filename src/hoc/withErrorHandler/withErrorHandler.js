import React, { Component } from "react";
import Modal from "../../Components/UI/Modal/Modal";
import Aux from "../Auxiliry/Auxilliry";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        constructor(props) {
            super(props);
            this.state = {
                error: null
            }
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({ error: null });
                return request
            }, error => {
                this.setState({ error: error });
                return Promise.reject(error)
            });
            this.resInterceptor = axios.interceptors.response.use(response => {
                return response
            }, error => {
                this.setState({ error: error });
                return Promise.reject(error)
            });

        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmed = () => {
            this.setState({ error: null })
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmed}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent  {...this.props} />
                </Aux>

            )
        }

    }
};

export default withErrorHandler