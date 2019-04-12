 import { combineReducers } from 'redux';
 import dataReducer from './data';
 import formReducer from './form';
 import displayReducer from './display';
 
 export default combineReducers({
     data: dataReducer,
    //  form: formReducer,
     display: displayReducer});