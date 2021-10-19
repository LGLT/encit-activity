import { JOIN_TO_TEAM } from '../actions/index';

const INITIAL_STATE = {
  teamName: undefined,
};

const joinToTeamReducer = (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case JOIN_TO_TEAM:
        return {
            ...state,
            teamName: payload
        }
    default:
      return state;    
  };
};

export default joinToTeamReducer;