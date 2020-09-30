
const GET_WATCHLIST = "watchlist";
const ADD_TO_WATCHLIST = "watchlist/add"

export default function stockReducer(state = {}, action) {
  let newState = Object.assign({}, state);
    switch(action.type) {
        case GET_WATCHLIST:
          newState["watchlist"] = action.watchlist;
          return newState;
        // case ADD_TO_WATCHLIST:
        //   newState["watchlist"] = action.watchlist;
        //   return newState;
        default:
            return state;
    }
}

const getWatchListThunk = (watchlist) => {
    return {
        type: GET_WATCHLIST,
        watchlist
    }
}
// const addWatchList = (watchlist) => {
//   return {
//     type: ADD_TO_WATCHLIST,
//     watchlist
//   }
// }


export const getWatchList = function(userId) {
    return async(dispatch) => {
        let res = await fetch(`/api/stocks/watchlist/${userId}`)
        if(res.ok) {
            let watchlist = await res.json();
            dispatch(getWatchListThunk(watchlist));
        }
    }
}


export const addToWatchList = function(watchlist, ticker) {
  return async (dispatch) => {
    let res = await fetch(`api/stocks/watchlist`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ticker, watchlist})
    })
    if(res.ok){
      let watchlist = await res.json();
      dispatch(getWatchListThunk(watchlist));
    }
  }
}
