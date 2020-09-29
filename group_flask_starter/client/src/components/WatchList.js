import React from "react";
import WatchListStock from "./WatchlistStock";

const WatchList = ( watchlist, userId) => {
  debugger;
  return (
    <>
      <p id="watchlist"> Stocks</p>
      <ul>
        {Object.values(watchlist.watchlist).map((stock) => (
          <div key={stock}>
            <WatchListStock stockId={stock} userID={userId}></WatchListStock>
          </div>
        ))}
      </ul>
    </>
  );
};

export default WatchList;
