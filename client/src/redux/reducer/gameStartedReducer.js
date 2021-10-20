import { GAME_STARTED } from '../actions/index';

const INITIAL_STATE = {
  gameStarted: false,
};

const gameStartedReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case GAME_STARTED:
        return {
            ...state,
            gameStarted: payload
        }
    default:
      return state;    
  };
};

export default gameStartedReducer;