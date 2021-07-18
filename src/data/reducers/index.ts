import { combineReducers } from "redux";
import user from "./user";
import currencies from "./currencies";
import exchange from "./exchange";

const createRootReducer = () =>
  combineReducers({
    user,
    currencies,
    exchange,
  });

export default createRootReducer;
