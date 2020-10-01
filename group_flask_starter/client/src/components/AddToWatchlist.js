import React, {useState} from 'react'

export default function AddToWatchlist(props){
    const [inWatchlist, setInWatchlist] = useState(false)

    const handleClick = async (e) => {
        // let res = await fetch("/api/stocks/watchlist", {
        //     method: "POST",
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify({watchlist: watchlistId, ticker: props.ticker})
        // })
    }

    return (
        <button className="add-to-watchlist" onClick={handleClick} type="button">
            {!inWatchlist ? "✓ Add to" : "x  Remove from"} Watchlist
        </button>
    )
}
