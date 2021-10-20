import { SELECTED_OPTION } from '../actions/index';

export const selectedOption = (state) => {
  localStorage.setItem('selectedOption', state);

  return {
    type: SELECTED_OPTION, 
    payload: state
  }
};