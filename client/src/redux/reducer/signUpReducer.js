import { SIGN_UP } from '../actions/index';

const INITIAL_STATE = {
  username: undefined,
};

const signUpReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SIGN_UP:
        return {
            ...state,
            username: payload
        }
    default:
      return state;    
  };
};

export default signUpReducer;