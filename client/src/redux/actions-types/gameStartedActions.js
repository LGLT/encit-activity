import { GAME_STARTED } from '../actions/index';

export const gameStarted = (state) => {
  localStorage.setItem('gameStarted', state);

  return {
    type: GAME_STARTED, 
    payload: state
  }
};