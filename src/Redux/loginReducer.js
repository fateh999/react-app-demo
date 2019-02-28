import { UPDATE_LOGIN_STATE } from './types';

const loginReducer = (
  state = {
    email: '',
    password: '',
    loading: false
  },
  action
) => {
  if (action.type === UPDATE_LOGIN_STATE) {
    const { key, value } = action.payload;
    return { ...state, [key]: value };
  }
  return state;
};

export default loginReducer;
