import React from 'react';
import { connect } from'react-redux';
import { bindActionCreators } from 'redux';

import './style.scss';

import * as actions from './actions';

import { Button, Snackbar, SnackbarContent } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';

class CustomSnackbar extends React.Component {

    render () {
        return (
            <Snackbar
                className={"snackbar-" + this.props.type}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={this.props.visible}
                autoHideDuration={5000}
                onClose={this.props.hideSnackbar}
                ContentProps={{
                    'aria-describedby': 'message-id'
                }}
            >
                <SnackbarContent 
                    message={
                        <span id="message-id">
                            {
                                this.props.type == 'info' ? 
                                    <InfoIcon 
                                        className="icon"
                                    />
                                : this.props.type == 'success' ? 
                                    <CheckCircleIcon
                                        className="icon"
                                    />
                                :
                                    <ErrorIcon 
                                        className="icon"
                                    />
                            }
    
                            {this.props.message}
                        </span>
                    }
                    action={
                        <Button key="dismiss" color="inherit" size="small" onClick={this.props.hideSnackbar}>
                            DISMISS
                        </Button>
                    }
                />
            </Snackbar>
        );
    }
}
 
const mapStateToProps = state => {
    const { visible, message, messageType } = state.display.snackbar ? state.display.snackbar : {};

    return { 
        visible,
        message,
        type: messageType
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({...actions}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CustomSnackbar);