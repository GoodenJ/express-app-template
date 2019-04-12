import React, { Component } from 'react';
import { connect } from'react-redux';
import { Route } from 'react-router-dom';

import AuthScreen from '../components/screens/authentication';

class PrivateRoute extends Component {
    render () {

        const isAuthenticated = () => {
            return typeof(this.props.token) == "string";
        }

        return (
            <Route
                path = {this.props.path}
                render = {() => isAuthenticated() ?
                    <this.props.component/> 
                :
                    <AuthScreen />
                }
            />
        );
    }
}

const mapStateToProps = state => {
    const token = state.data.responseData.AUTHENTICATION ? state.data.responseData.AUTHENTICATION.data ? state.data.responseData.AUTHENTICATION.data : undefined : undefined;

    return {
        token
    }
}

// const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

const AuthorizedRoute = connect(mapStateToProps, null)(PrivateRoute);

export default AuthorizedRoute;