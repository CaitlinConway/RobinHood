
const GET_WATCHLIST = "watchlist";
const ADD_TO_WATCHLIST = "watchlist/add"
const DELETE_STOCK_WATCHLIST = "watchlist/delete"
const SEARCH = ""

export default function stockReducer(state = {}, action) {
  let newState = Object.assign({}, state);
    switch(action.type) {
        case GET_WATCHLIST:
          newState["watchlist"] = action.watchlist;
          return newState;
        case DELETE_STOCK_WATCHLIST:
          delete newState[action.stock.id];
          return newState;
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
const deleteWatchList = (stock) => {
  return {
    type: DELETE_STOCK_WATCHLIST,
    stock
  }
}

// const searchThunk = (stock) => {
//   return {
//     type: SEARCH,
//     stock
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

export const deleteStockWatchlist = function(watchlist, ticker) {
  return async (dispatch) => {
    let res = await fetch(`api/stocks/watchlist`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ticker, watchlist})
    })
    if (res.ok){
      let stock = await res.json();
      dispatch(deleteWatchList(stock));
    }
  }
}

export const getSearch = function(stockId) {
  return async(dispatch) => {
      let res = await fetch(`/api/stocks/${stockId}`)
      if(res.ok) {
          let stock = await res.json();
          // dispatch(searchThunk(stock));
      }
  }
}
