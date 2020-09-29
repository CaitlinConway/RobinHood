
const GET_WATCHLIST = "auth/watchlist";


export default function stockReducer(state = {}, action) {
    switch(action.type) {
        case GET_WATCHLIST:
            return {watchlist: action.watchlist};
        default:
            return state;
    }
}

const watchlist = (watchlist) => {
    return {
        type: GET_WATCHLIST,
        watchlist
    }
}



export const getWatchList = function(userId) {
    return async(dispatch) => {
        let res = await fetch(`/api/stocks/watchlist/${userId}`)
        if(res.ok) {
            let watchlist = await res.json();
            dispatch(getWatchList(watchlist));
        }
    }
}
