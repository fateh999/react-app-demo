import { UPDATE_SIGNUP_STATE } from './types';

const signupReducer = (
  state = {
    name: '',
    email: '',
    password: '',
    loading: false
  },
  action
) => {
  if (action.type === UPDATE_SIGNUP_STATE) {
    const { key, value } = action.payload;
    return { ...state, [key]: value };
  }
  return state;
};

export default signupReducer;
