import { SAVE_POINTS } from '../actions/index';

export const savePoints = (number) => {
  localStorage.setItem('totalPoints', number);

  return {
    type: SAVE_POINTS, 
    payload: number
  }
};