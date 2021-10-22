import { SAVE_TIMER_HOST } from '../actions/index';

const INITIAL_STATE = {
  timerHost: undefined,
};

const saveTimerHost = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SAVE_TIMER_HOST:
        return {
            ...state,
            timerHost: payload
        }
    default:
      return state;    
  };
};

export default saveTimerHost;