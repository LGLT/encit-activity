import { SAVE_TIMER_HOST } from '../actions/index';

export const saveTimerHost = (state) => {
  
  if(!localStorage.timerHost) localStorage.setItem('timerHost', state);

  return {
    type: SAVE_TIMER_HOST, 
    payload: state
  }
};