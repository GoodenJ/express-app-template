import fetch from 'cross-fetch';
import { getURI } from '../env.config.js';
import { loadStart, loadEnd, loadFailure } from '../components/common/actions/loaders';

import { showSnackbar } from '../components/common/components/snackbar/actions';
import history from '../components/common/utils/history';

const AUTHENTICATION = 'AUTHENTICATION';

export const authenticateUser = (authenticationDetails, dispatch) => {
    return new Promise((resolve) =>{
        dispatch(loadStart(AUTHENTICATION));
        fetch(`${getURI()}/login`, {
                method:"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },        
                body: JSON.stringify({
                    username: authenticationDetails.username,
                    password: authenticationDetails.password
                })
        }).then( res=>{
            if (res.status == 200){
                res.json().then( response => {
                    dispatch(loadEnd(AUTHENTICATION, response.token));
                    dispatch(showSnackbar('success', 'Login successful'));
                    history.push('/home');
                    resolve(true);
                })
            } else if (res.status == 404) {
                dispatch(loadFailure(AUTHENTICATION));
                dispatch(showSnackbar('error', 'Login failed'));
                resolve(false);
            } else {
                res.json().then(response => {
                    dispatch(loadFailure(AUTHENTICATION));
                    dispatch(showSnackbar('error', response.message));
                    resolve(false);
                })
            }
        }).catch(err => {
            console.error(err);
        });
    });
}