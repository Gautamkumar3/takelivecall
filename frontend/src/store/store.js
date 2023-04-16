import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { eventReducer } from "./event/event.reducer";
import { eventDetailsReducer } from "./eventDetails/eventdetails.reducer";

const rootReducer = combineReducers({
  eventData: eventReducer,
  eventDetailsData: eventDetailsReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
