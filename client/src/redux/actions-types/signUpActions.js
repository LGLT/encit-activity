import { SIGN_UP } from '../actions/index';

export const signUp = (username) => {
  localStorage.setItem('username', username);

  return {
    type: SIGN_UP, 
    payload: username
  }
};