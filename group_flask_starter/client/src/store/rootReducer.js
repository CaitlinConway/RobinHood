import { combineReducers } from "redux";
import authReducer from "./authReducer";
import stockReducer from './stockReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  stock: stockReducer
});

export default rootReducer;
