import { UPDATE_APP_STATE } from './types';

const appReducer = (
  state = {
    loggedin: false,
    loading: false,
    email: '',
    name: ''
  },
  action
) => {
  if (action.type === UPDATE_APP_STATE) {
    const { key, value } = action.payload;
    return { ...state, [key]: value };
  }
  return state;
};

export default appReducer;
