import {createStore} from "redux";
import authReducer from "./authReducer";

let store = createStore({
    authentication: authReducer
})

export default store;
