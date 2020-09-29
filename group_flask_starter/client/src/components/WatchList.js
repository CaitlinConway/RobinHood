import React from "react";
import WatchListStock from "./WatchlistStock";

const WatchList = ( watchlist, userId) => {
  debugger;
  return (
    <>
      <div id="watchlist-div"> Stocks
      <ul id="watchlist">
        {Object.values(watchlist.watchlist).map((stock) => (
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
