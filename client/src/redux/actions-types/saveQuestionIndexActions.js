import { SAVE_QUESTION_INDEX } from '../actions/index';

export const saveQuestionIndex = (index) => {
  localStorage.setItem('questionIndex', index);

  return {
    type: SAVE_QUESTION_INDEX, 
    payload: index
  }
};