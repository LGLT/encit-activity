import { SELECTED_OPTION } from '../actions/index';

const INITIAL_STATE = {
  selectedOption: false,
};

const selectedOptionReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SELECTED_OPTION:
        return {
            ...state,
            selectedOption: payload
        }
    default:
      return state;    
  };
};

export default selectedOptionReducer;