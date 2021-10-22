// En este archivo se hace el combine
import { combineReducers } from "redux";

// importar cada reducer(exportarlos en su archivo por default) y añadirlos a rootReducer
import signUpReducer from "./signUpReducer";
import joinToTeamReducer from "./joinToTeamReducer";
import gameStartedReducer from "./gameStartedReducer";
import selectedOptionReducer from "./selectedOptionReducer";
import saveTimerHost from "./saveTimerHostReducer";
import saveQuestionIndex from "./saveQuestionIndexReducer";
import savePointsReducer from "./savePointsReducer";
import saveAllSelections from "./saveAllSelectionsReducer";


const rootReducer = combineReducers({
  signUpReducer,
  joinToTeamReducer,
  gameStartedReducer,
  selectedOptionReducer,
  saveTimerHost,
  saveQuestionIndex,
  savePointsReducer,
  saveAllSelections
});

export default rootReducer;
