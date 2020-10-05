
const LOGIN = "auth/login";
const LOGOUT = "auth/logout";
const UPDATEBALANCE = "user/balance/update"


export default function authReducer(state = {}, action) {
  let newState = Object.assign({}, state);
    switch(action.type) {
        case LOGIN:
          newState["id"] = action.id;
          newState["email"] = action.email;
          newState["balance"] = action.balance;
          newState["firstName"] = action.firstName;
          newState["lastName"] = action.lastName;
          newState["watchlistId"] = action.watchlistId;
            return newState;
        case LOGOUT:
            return {};
        case UPDATEBALANCE:
            newState["balance"] = action.balance;
            return newState;
        default:
            return state;
    }
}

export const setUser = (id, email, balance, lastName, firstName, watchlistId) => {
    return {
        type: LOGIN,
        id,
        email,
        balance,
        lastName,
        firstName,
        watchlistId
    }
}

const logoutUser = () => {
  return {
    type: LOGOUT
  }
}

const updateUserBalance = (balance) => {
    return {
        type: UPDATEBALANCE,
        balance
    }
}

export const login = function(email, password) {
    return async(dispatch) => {
        let res = await fetch("/api/users/login", {
            method: "POST",
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify({email, password})
        })
        if(res.ok) {
            let currentUser = await res.json();
            dispatch(setUser(currentUser.id, currentUser.email, currentUser.balance, currentUser.lastName, currentUser.firstName, currentUser.watchlistId));
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
            dispatch(setUser(res.data.id, res.data.email, res.data.balance, res.firstName, res.lastName, res.watchlistId))
            // alert("Signup successful! Returning to login page.")
        }
    }
}


export function updateBalance(userId) {
    return async(dispatch) => {
        let res = await fetch(`/api/users/${userId}/balance`)
        if(res.ok) {
            let data = await res.json();
            let balance = data.userBalance
            dispatch(updateUserBalance(balance))
        }
    }
}

export function addToBalance(amount, userId) {
    return async(dispatch) => {
        let res = await fetch(`/api/users/new-balance/${userId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(amount)
        })
        if (res.ok) {
            let data = await res.json();
            let balance = data.newBalance
            dispatch(updateUserBalance(balance))
        }
    }
}
