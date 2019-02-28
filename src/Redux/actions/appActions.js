import { UPDATE_APP_STATE } from '../types';
import HttpClient from '../../HttpClient/HttpClient';
import DataStore from '../../DataStore/DataStore';

const updateAppState = (key, value) => {
  return {
    type: UPDATE_APP_STATE,
    payload: { key, value }
  };
};

const getDetails = () => async dispatch => {
  try {
    dispatch({
      type: UPDATE_APP_STATE,
      payload: {
        key: 'loading',
        value: true
      }
    });
    const responseData = await HttpClient.getDetails();
    console.log('responseData', responseData);
    const { email, name } = responseData.data;
    dispatch({
      type: UPDATE_APP_STATE,
      payload: {
        key: 'email',
        value: email
      }
    });
    dispatch({
      type: UPDATE_APP_STATE,
      payload: {
        key: 'name',
        value: name
      }
    });
    dispatch({
      type: UPDATE_APP_STATE,
      payload: {
        key: 'loading',
        value: false
      }
    });
  } catch (error) {
    if (error.response) {
      const { message } = error.response.data;
      alert(message);
      if (error.response.status === 401) {
        dispatch({
          type: UPDATE_APP_STATE,
          payload: {
            key: 'loggedin',
            value: false
          }
        });
        DataStore.clear();
      }
    } else {
      alert('Cannot connect with server');
    }
    dispatch({
      type: UPDATE_APP_STATE,
      payload: {
        key: 'loading',
        value: false
      }
    });
  }
};

const appActions = {
  updateAppState,
  getDetails
};

export default appActions;
