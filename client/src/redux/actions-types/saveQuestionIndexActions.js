import { SAVE_QUESTION_INDEX } from '../actions/index';

export const saveQuestionIndex = (index) => {
  // if(localStorage.questionIndex && index !== 0){} 
  // else

  if(localStorage.questionIndex){
    if(index === 0) {console.log('HAY REINICIO')}
    else localStorage.setItem('questionIndex', index);
  }
  else localStorage.setItem('questionIndex', index);

  return {
    type: SAVE_QUESTION_INDEX, 
    payload: index
  }
};