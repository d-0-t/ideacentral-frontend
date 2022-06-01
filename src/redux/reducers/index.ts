import { combineReducers } from "redux";
import keywordReducer from "./keywordReducer";
import themeReducer from "./themeReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  keywordReducer,
  themeReducer,
  userReducer,
});

export default rootReducer;
