import { SAVE_QUESTION_INDEX } from '../actions/index';

const INITIAL_STATE = {
  index: 0,
};

const saveQuestionIndex = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case SAVE_QUESTION_INDEX:
        return {
            ...state,
            index: payload
        }
    default:
      return state;    
  };
};

export default saveQuestionIndex;