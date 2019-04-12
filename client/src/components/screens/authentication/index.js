import { connect } from'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from './actions';
import View from './view';

const mapStateToProps = state => {
    const authenticationDetails = state.display.authentication ? state.display.authentication.authenticationDetails : {};
    const token = state.data.responseData.AUTHENTICATION ? state.data.responseData.AUTHENTICATION.data : '';
    
    return {
        authenticationDetails,
        token
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

const Login = connect(mapStateToProps, mapDispatchToProps)(View);

export default Login;