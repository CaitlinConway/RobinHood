
const LOGIN = "auth/login";
const LOGOUT = "auth/logout";


export default function authReducer(state = {}, action) {
  let newState = Object.assign({}, state);
    switch(action.type) {
        case LOGIN:
          newState["id"] = action.id;
          newState["email"] = action.email;
            return newState;
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
        let res = await fetch("/api/users/login", {
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({email, password})
        })
        if(res.ok) {
            let currentUser = await res.json();
            dispatch(setUser(currentUser.id, currentUser.email));
        }
    }
}

export const logOut = () => {
    return async function(dispatch) {
        let res = await fetch("/api/users/logout", {
            method: "DELETE",
        });
        if(res.ok) {
            dispatch(logoutUser());
            return "success";
        }
    }
}

export const signUp = function(firstName, lastName, email, password) {
    return async function(dispatch) {
        const res = await fetch("/api/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ firstName, lastName, email, password, })
        })
        res.data = await res.json();
        const { error } = res.data

        if (res.data.error) {
            alert(error)
        }
        else if(res.ok && !res.data.error) {
            dispatch(setUser(res.data.id, res.data.email))
            alert("Signup successful! Returning to login page.")
        }
    }
}
