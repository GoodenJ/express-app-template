import React from 'react';
import './style.scss';
import history from '../../common/utils/history';

import { TextField, Button } from '@material-ui/core';


class Login extends React.Component {
    constructor(props) {
        super(props); 
    }

    // componentWillUpdate() {
    //     this.props.token != '' ? this.props.token != {} ? history.push('/home') : '' : '';
    // }    

    render() {

        const handleSubmit = (e) => {
            e.preventDefault();
            this.props.onLogin();
        }

        return(
            <div className="login page">
                <div className="pageInner">
                    
                    <form className = "Form" onSubmit = {handleSubmit}>
                        <div className = "loginForm">
                            <div className = "formHeader">Login</div>

                            <div className="inputRow">
                                
                                <TextField
                                    
                                    autoFocus={true}
                                    className='Input-full'
                                    data-id="username"
                                    name='username'
                                    label='Username'
                                    value={this.props.authenticationDetails ? this.props.authenticationDetails.username ? this.props.authenticationDetails.username : '' : ''}
                                    onChange={value => this.props.onUpdateField({'username': value.target.value})}
                                    required={true}
                                />
                            </div>

                            <div className="inputRow">
                                
                                <TextField
                                    
                                    className='Input-full'
                                    data-id="password"
                                    name='password'
                                    type='password'
                                    label='Password'
                                    value={this.props.authenticationDetails ? this.props.authenticationDetails.password ? this.props.authenticationDetails.password : '' : ''}
                                    onChange={value => this.props.onUpdateField({'password': value.target.value})}
                                    required={true}
                                />
                            </div>
                        </div>
                            
                        <div className= "loginButtons">
                            <Button variant="contained" color="primary" type = "submit" className="saveBtn">
                                Login
                            </Button>
                            <Button variant="contained" color="primary" className="cancelBtn" onClick={() => this.props.onClearCredentials()} >
                                Cancel
                            </Button>
                        </div>
                        
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;