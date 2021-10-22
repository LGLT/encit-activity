import { SAVE_ALL_SELECTIONS } from '../actions/index';

const INITIAL_STATE = {
  allSelections: []
};

const saveAllSelections = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SAVE_ALL_SELECTIONS:
        return {
            ...state,
            allSelections: payload
        }
    default:
      return state;    
  };
};

export default saveAllSelections;