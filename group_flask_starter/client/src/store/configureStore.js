<<<<<<< HEAD
import {createStore} from "redux";
import authReducer from "./authReducer";

let store = createStore({
    authentication: authReducer
})

export default store;
=======
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import logger from "redux-logger";
let storeEnhancer;

if (process.env.NODE_ENV !== "production") {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  storeEnhancer = composeEnhancers(applyMiddleware(thunk));
} else {
  storeEnhancer = applyMiddleware(thunk, logger);
}

export default function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState, storeEnhancer);
}
>>>>>>> master
