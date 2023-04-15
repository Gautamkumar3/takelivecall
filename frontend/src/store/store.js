import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { eventReducer } from "./event/event.reducer";

const rootReducer = combineReducers({
  eventData: eventReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
