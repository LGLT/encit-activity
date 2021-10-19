// En este archivo se hace el combine
import { combineReducers } from "redux";

// importar cada reducer(exportarlos en su archivo por default) y añadirlos a rootReducer
import signUpReducer from "./signUpReducer";
import joinToTeamReducer from "./joinToTeamActions";


const rootReducer = combineReducers({
  signUpReducer,
  joinToTeamReducer
});

export default rootReducer;
