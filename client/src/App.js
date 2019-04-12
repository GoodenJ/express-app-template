import React, { Component } from 'react';
import { connect } from'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, Switch } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Drawer, Menu, MenuItem } from '@material-ui/core'
import { GpsFixed as MenuIcon } from '@material-ui/icons';

import CustomSnackbar from './components/common/components/snackbar';
//import BaseScreen from './components/screens/base';
import AuthScreen from './components/screens/authentication';
import HomeScreen from './components/screens/home';
import RegistrationScreen from './components/screens/registration';
import FirearmRegistrationScreen from './components/screens/firearmRegistration';
import UserRegistrationScreen from './components/screens/userRegistration';
import CheckInScreen from './components/screens/checkin';
import POSScreen from './components/screens/sale';
import ReportScreen from './components/screens/reports';
import UserDetails from './components/screens/userDetails';
import Inventory from './components/screens/inventory';

import history from './components/common/utils/history';


import './App.scss';
import { onLogout } from './components/screens/authentication/actions';
import AuthorizedRoute from './containers/AuthorizedRoute';
import ProfileRoute from './containers/ProfileRoute';

//import 'bootstrap/dist/css/bootstrap.min.css';

const styles = {
    AppBar:{
        'background-color': '#00A3CB'
    }
}

class View extends Component {

    state = {
        anchorEl: null
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render () {
        const { anchorEl } = this.state;

        const logout = () => {
            this.props.onLogout();
            history.push('/login');
        }

        return(
            <Router history = {history}>
                <div className = "AppLayout">
                    <CustomSnackbar />
                    <Drawer
                        variant="permanent"
                        open={true}
                    >
                    </Drawer>
                    <Switch>
                        <Route path = '/login' component = {AuthScreen} />
                        <AuthorizedRoute path = '/home' component = {HomeScreen} />
                        <AuthorizedRoute path = '/' component={HomeScreen} />
                    </Switch>
                </div>
            </Router>
        );  
    }
}

const mapStateToProps = state => {
    const token = state.data.responseData.AUTHENTICATION ? state.data.responseData.AUTHENTICATION.data ? state.data.responseData.AUTHENTICATION.data : undefined : undefined;
    
    return {
        token
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({onLogout}, dispatch);

const App = connect(mapStateToProps, mapDispatchToProps)(View);

export default App;