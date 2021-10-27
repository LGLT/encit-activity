import { SAVE_ALL_SELECTIONS } from '../actions/index';

export const saveAllSelections = (selections) => {

  // console.log('SELECCIONESSSS:', selections)

  return {
    type: SAVE_ALL_SELECTIONS, 
    payload: selections
  }
};