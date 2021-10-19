import { JOIN_TO_TEAM } from '../actions/index';

export const joinToTeam = (teamName) => {
  localStorage.setItem('teamName', teamName);

  return {
    type: JOIN_TO_TEAM, 
    payload: teamName
  }
};