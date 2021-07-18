import { createStore, applyMiddleware, compose } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

const initialState = {};

const composeFunc =
  process.env.NODE_ENV === "development" ? composeWithDevTools : compose;

const composedEnhancers = compose(
  applyMiddleware(thunk)
);

const store = createStore(
  rootReducer(),
  initialState,
  composedEnhancers
);

export default store;
