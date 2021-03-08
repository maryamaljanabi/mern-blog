import { combineReducers } from "redux";
import { userAuthReducer } from "./userAuthReducer";

const rootReducer = combineReducers({
  user: userAuthReducer,
});

export default rootReducer;
