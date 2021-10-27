import { SAVE_POINTS } from '../actions/index';

export const savePoints = (number) => {
  // console.log('NÚMERO DE PUNTOS:', number)
  localStorage.setItem('totalPoints', number);

  return {
    type: SAVE_POINTS, 
    payload: number
  }
};