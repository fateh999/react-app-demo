import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import appReducer from './appReducer';

const rootReducer = combineReducers({
  appState: appReducer,
  loginState: loginReducer,
  signupState: signupReducer
});

export default rootReducer;
