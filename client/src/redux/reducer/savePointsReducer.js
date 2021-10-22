import { SAVE_POINTS } from '../actions/index';

const INITIAL_STATE = {
  points: 0,
};

const savePointsReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SAVE_POINTS:
        return {
            ...state,
            points: payload
        }
    default:
      return state;    
  };
};

export default savePointsReducer;