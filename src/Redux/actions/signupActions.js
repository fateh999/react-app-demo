import { UPDATE_SIGNUP_STATE, UPDATE_APP_STATE } from '../types';
import HttpClient from '../../HttpClient/HttpClient';
import DataStore from '../../DataStore/DataStore';

const updateState = (key, value) => {
  return {
    type: UPDATE_SIGNUP_STATE,
    payload: { key, value }
  };
};

const signup = user => async dispatch => {
  try {
    dispatch({
      type: UPDATE_SIGNUP_STATE,
      payload: {
        key: 'loading',
        value: true
      }
    });

    const responseData = await HttpClient.signUp(user);
    console.log('responseData', responseData);
    const { message } = responseData.data;
    alert(message);
    const keys = ['name', 'email', 'password', 'loading'];
    keys.forEach(key => {
      dispatch({
        type: UPDATE_SIGNUP_STATE,
        payload: {
          key: key,
          value: ''
        }
      });
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SIGNUP_STATE,
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

const signupActions = {
  updateState,
  signup
};

export default signupActions;
