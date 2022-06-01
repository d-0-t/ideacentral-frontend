import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { RootState } from "../../types/typesOfState";
import rootReducer from "../reducers";

function saveToLocalStorage(state: RootState) {
  try {
    const localStorageState = JSON.stringify(state);
    localStorage.setItem("state", localStorageState);
  } catch (err) {
    console.log(err);
  }
}

function loadFromLocalStorage() {
  const localStorageState = localStorage.getItem("state");
  if (localStorageState === null) return undefined;
  return JSON.parse(localStorageState);
}

export default function storeFactory() {
  const middleware = [thunk];
  const storeData = createStore(
    rootReducer,
    loadFromLocalStorage(),
    composeWithDevTools(applyMiddleware(...middleware))
  );
  storeData.subscribe(() => saveToLocalStorage(storeData.getState()));
  return storeData;
}
