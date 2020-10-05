import LOGOUT from './authReducer'
const GET_WATCHLIST = "watchlist";
const DELETE_STOCK_WATCHLIST = "watchlist/delete"
const GET_NEWS = 'news';
const GET_STOCKLIST ="stocklist"
const UPDATE_STOCKS_OWNED = "stocks/owned"

export default function stockReducer(state = {}, action) {
  let newState = Object.assign({}, state);
    switch(action.type) {
        case GET_WATCHLIST:
          newState["watchlist"] = action.watchlist;
          return newState;
        case DELETE_STOCK_WATCHLIST:
          newState.watchlist.tickers = newState.watchlist.tickers.filter(el => el !== action.stock.ticker )
          return newState;
        case GET_NEWS:
          newState["news"] = action.news
          return newState;
        case GET_STOCKLIST:
          newState["stocklist"] = action.stocklist
          return newState;
        case UPDATE_STOCKS_OWNED:
          newState["owned"] = action.stocks
          return newState;
        case LOGOUT:
          return {};
        default:
            return state;
    }
}


const updateStocks = (stocks) => {
  return {
    type: UPDATE_STOCKS_OWNED,
    stocks
  }
}

const getWatchListThunk = (watchlist) => {
    return {
        type: GET_WATCHLIST,
        watchlist
    }
}

const deleteFromWatchList = (stock) => {
  return {
    type: DELETE_STOCK_WATCHLIST,
    stock
  }
}



const getNewsThunk = (news) => {
  return {
    type: GET_NEWS,
    news
  }
}

const getStocklistThunk = (stocklist) =>{
  return {
    type: GET_STOCKLIST,
    stocklist
  }
}

export const getWatchList = function(userId) {
    return async(dispatch) => {
        let res = await fetch(`/api/stocks/watchlist/${userId}`)

        if(res.ok) {
            let watchlist = await res.json();
            dispatch(getWatchListThunk(watchlist));
        }
    }
}


export const addToWatchList = function(watchlistId, ticker) {
  return async (dispatch) => {
    let res = await fetch(`/api/stocks/watchlist`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ticker,watchlistId})
    })
    if(res.ok){
      let watchlist = await res.json();
      if(watchlist.error) {
        return watchlist
      } else {
        dispatch(getWatchListThunk(watchlist));
        return true;
      }
    }
  }
}

export const deleteFromStockWatchlist = function(watchlistId, ticker) {
  return async (dispatch) => {
    let res = await fetch(`/api/stocks/watchlist/${watchlistId}/${ticker.toUpperCase()}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })

    if (res.ok){
      let stock = await res.json();
      dispatch(deleteFromWatchList(stock));
    }
  }
}

// export const getSearch = function(stockId) {
//   return async(dispatch) => {
//       let res = await fetch(`/api/stocks/${stockId}`)
//       if(res.ok) {
//           let stock = await res.json();
//           // dispatch(searchThunk(stock));
//       }
//     }
//   }

export const getShares = function() {
  return;
}

export const getNews = function() {
  return async (dispatch) => {
      let res = await fetch(`/api/stocks/news`)
      if(res.ok) {
          let news = await res.json();
          let newsArray =news.values;
          dispatch(getNewsThunk(newsArray));
      }
  }
}

export const getStocklist = function(userId) {
  return async(dispatch) => {
      let res = await fetch(`/api/stocks/stocklist/${userId}`)
      if(res.ok) {
          let stocklist = await res.json();
          dispatch(getStocklistThunk(stocklist));
      }
    }
}

export function updateStocksThunk({ticker, price, shares, buy, userId}) {
  return async(dispatch) => {
    let res = await fetch(`/api/stocks/trades/${userId}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ticker, price, shares, buy})
    })
    if (res.ok) {
      let stocks = await res.json();
      if(stocks.error) {
        return stocks
      }

      dispatch(updateStocks(stocks.stocks))
      return "success"
    }
  }
}

export function addBalanceThunk({amount, userId}) {
  return async(dispatch) => {
    let res = await fetch(`/api/account/${userId}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(amount)
    })
    if (res.ok) {
      let newAmount = await res.json();
      if (newAmount.error) {
        return newAmount
      }
      return "success"
    }
  }
}

export function getStocks(userId) {
  return async(dispatch) => {
    let res = await fetch(`/api/stocks/owned/${userId}`)
    if (res.ok) {
      let stocks = await res.json();
      dispatch(updateStocks(stocks.stocks))
    }
  }
}
