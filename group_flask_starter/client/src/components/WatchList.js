import React from "react";
import WatchListStock from "./WatchlistStock";

const WatchList = ({ watchlist}) => {
  return (
    <>
      <p id="watchlist"> Stocks</p>
      <ul>
        {Object.values(watchlist).map((stock) => (
          <div key={stock.id}>
            <WatchListStock stock={stock}></WatchListStock>
          </div>
        ))}
      </ul>
    </>
  );
};

export default WatchList;
