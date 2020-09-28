import Cookies from "js-cookie";

const LOGIN = "auth/login";
const LOGOUT = "auth/logout";


export default function authReducer(state = {}, action) {
    switch(action.type) {
        case LOGIN:
            return {id: action.id, email: action.email};
        case LOGOUT:
            return {};
        default:
            return state;
    }
}

const setUser = (id, email) => {
    return {
        type: LOGIN,
        id,
        email
    }
}

const logoutUser = () => ({
    type: LOGOUT
})


export const login = function(email, password) {
    return async(dispatch) => {
        let user = await fetch("/api/users/login", {
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({email, password})
        })
    }
}
