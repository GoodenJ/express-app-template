import { combineReducers } from 'redux';

import snackbar from './snackbar';
import authentication from './authentication';

export default combineReducers({
  authentication,
  snackbar
});