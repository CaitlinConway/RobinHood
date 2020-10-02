import React, {useState} from "react";
import { useSelector } from "react-redux";

export default function StockBuy(props) {
    let [type, setType] = useState("Dollars");
    let [amount, setAmount] = useState(0);
    let [buy, setBuy] = useState(true);
    const balance = useSelector(state => state.auth?.balance || 0);

    const updateType = (e) => {
       setType(e.target.value)
    }

    const updateAmount = (e) => {
        setAmount(Number(e.target.value))
    }

    const updateBuy = (e) => {
        setBuy(e.target.value === "Buy")
    }

    const makeTrade = (e) => {
        e.preventDefault();
        const data = {
            ticker: props.ticker,
            price: props.price,
            shares: (type === "Dollars" ? (amount/Number(props.price)) : amount),
            buy: buy,
            buyDate: Date.now()
            // userId:
        }
        // setBalance()
    }

    return (
        <div className="buy-container">
            <form method="POST" action="/stocks/trades" className="buy-form" autoComplete="off">
                    <select className="stock-input stock-buy-sell" onChange={updateBuy}>
                        <option> Buy {props.ticker} </option>
                        <option> Sell {props.ticker} </option>
                    </select>
                    <div className="stock-input">
                        <label htmlFor="type"> Invest In</label>
                        <select onChange={updateType} name="type" id="stock-type-dropdown" value={type}>
                            <option>Dollars</option>
                            <option>Shares</option>
                        </select>
                    </div>
                    <div className="stock-input">
                        <label htmlFor="amount"> {type === "Dollars" ? "Amount" : "Shares"}</label>
                        <input type="number" name="amount" onChange={updateAmount} id="stock-amount"/>
                    </div>
                    <div className="stock-input market">
                        <div style={{color: "#03C805"}}> Market Price</div>
                        <div style={{fontWeight: "bold"}}>${props.price}</div>
                    </div>
                    <div className="stock-input">
                        <div style={{fontWeight: "bold"}}> {type === "Dollars" ? "Est. Quantity" : "Estimated Cost"}</div>
                        <div>{type === "Dollars" ? ((amount/Number(props.price)) || 0).toFixed(2) : "$" + ((amount * Number(props.price))|| 0).toFixed(2)}</div>
                    </div>
                    <button type="submit" className="stock-buy-button" onClick={makeTrade}>Place Order</button>
            </form>
            <div className="balance">
                Your current balance is ${balance}
            </div>
        </div>
        )
}
