import { UPDATE_LOGIN_STATE, UPDATE_APP_STATE } from '../types';
import HttpClient from '../../HttpClient/HttpClient';
import DataStore from '../../DataStore/DataStore';

const updateState = (key, value) => {
  return {
    type: UPDATE_LOGIN_STATE,
    payload: { key, value }
  };
};

const login = user => async dispatch => {
  try {
    dispatch({
      type: UPDATE_LOGIN_STATE,
      payload: {
        key: 'loading',
        value: true
      }
    });

    const responseData = await HttpClient.login(user);
    console.log('responseData', responseData);
    const { message, token } = responseData.data;
    alert(message);
    DataStore.set('token', token);
    dispatch({
      type: UPDATE_APP_STATE,
      payload: {
        key: 'loggedin',
        value: true
      }
    });
    const keys = ['email', 'password', 'loading'];
    keys.forEach(key => {
      dispatch({
        type: UPDATE_LOGIN_STATE,
        payload: {
          key: key,
          value: ''
        }
      });
    });
  } catch (error) {
    dispatch({
      type: UPDATE_LOGIN_STATE,
      payload: {
        key: 'loading',
        value: false
      }
    });
    if (error.response) {
      const { message } = error.response.data;
      alert(message);
    } else {
      alert('Cannot connect with server');
    }
  }
};

const loginActions = {
  updateState,
  login
};

export default loginActions;
