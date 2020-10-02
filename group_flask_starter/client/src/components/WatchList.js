import React from "react";
import WatchListStock from "./WatchlistStock";

const WatchList = (watchlist, userId, linkfunc) => {
  console.log(watchlist)
  return (
    <>
      <div id="watchlist-div">
      <h1 className = 'watchlist-title'>Stocks</h1>
      <ul id="watchlist">
        {watchlist.watchlist.tickers.slice(0,9).map((stock) => (
          <li key={stock}>
            <WatchListStock stock={stock} userID={userId} linkfunc={linkfunc}></WatchListStock>
          </li>
        ))}
      </ul>
      </div>
    </>
  );
};


export default WatchList;
