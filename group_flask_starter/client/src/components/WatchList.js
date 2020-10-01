import React from "react";
import WatchListStock from "./WatchlistStock";

const WatchList = (watchlist, userId) => {
  return (
    <>
      <div id="watchlist-div">
      <h1 className = 'watchlist-title'>Stocks</h1>
      <ul id="watchlist">
        {Object.values(watchlist.watchlist).slice(0,9).map((stock) => (
          <li key={stock}>
            <WatchListStock stock={stock} userID={userId}></WatchListStock>
          </li>
        ))}
      </ul>
      </div>
    </>
  );
};

export default WatchList;
