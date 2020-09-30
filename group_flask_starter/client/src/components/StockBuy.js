import React, {useState} from "react";

export default function StockBuy(props) {
   let [type, setType] = useState("Shares")

    const updateType = (e) => {
       setType(e.target.value)
    }

    return (
        <div className="buy-container">
            <select>
                <option> Buy {props.ticker} </option>
                <option> Sell {props.ticker} </option>
            </select>
            <form method="POST" action="/stocks/trades">
                <label for="type"> Invest In</label>
                <select onChange={updateType} name="type">
                    <option> Dollars</option>
                    <option> Shares</option>
                </select>
                <label for="amount"> Amount</label>
                <input type="number" name="amount"/>
                <div> Market Price</div>
                <div></div>
            </form>
        </div>
        )
}
