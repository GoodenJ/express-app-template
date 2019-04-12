import { authenticateUser } from '../../../loaders/authentication';

export const onUpdateField = value => ({
    type: 'UPDATE_LOGIN',
    value
});

export const logoutUser = () => ({
    type: 'LOGOUT'
});

export const onClearCredentials = () => ({
    type: 'CLEAR_CREDENTIALS'
});

export const onLogin = () => (dispatch, getState) => {

    const authenticationDetails = getState().display.authentication ? getState().display.authentication.authenticationDetails : {} ;
    authenticateUser(authenticationDetails, dispatch);
    dispatch(onClearCredentials());
};

export const onLogout = () => (dispatch) => {
    
    dispatch(logoutUser());
};
