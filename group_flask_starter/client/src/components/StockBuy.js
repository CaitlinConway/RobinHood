import React, {useState, useEffect} from "react";
import { useSelector, useDispatch} from "react-redux";
import { updateStocksThunk } from '../store/stockReducer';
import { updateBalance } from "../store/authReducer";

export default function StockBuy(props) {
    let [type, setType] = useState("Dollars");
    let [amount, setAmount] = useState(0);
    let [buy, setBuy] = useState(true);
    let [sharesOwned, setSharesOwned] = useState(0)
    const balance = useSelector(state => state.auth?.balance || 0);
    const userId = useSelector(state => state.auth?.id);
    const dispatch = useDispatch();

    useEffect(()=> {
        function getShares() {
            let shares = 0;
            for(let i=0; i<props.allShares.length; i++) {
                let current = props.allShares[i];
                if(current[props.ticker] !== undefined) {
                    shares = current[props.ticker];
                    break;
                }
            }
            setSharesOwned(shares)
        }
        getShares();
    }, [props.ticker, props.allShares])

    const updateType = (e) => {
       setType(e.target.value)
    }

    const updateAmount = (e) => {
        setAmount(Number(e.target.value))
    }

    const updateBuy = (e) => {
        setBuy(e.target.value === "Buy")
    }

    const makeTrade = async (e) => {
        e.preventDefault();
        const data = {
            ticker: props.ticker,
            price: props.price,
            shares: (type === "Dollars" ? (amount/Number(props.price)) : amount),
            buy: buy,
            userId: userId
        }
        // setBalance()
        let trade = await dispatch(updateStocksThunk(data));
        if(trade.error) props.setErrors(trade.error)
        if (trade === "success") dispatch(updateBalance(userId))
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
            <div className="shares">
                You own {sharesOwned} shares of {props.ticker}
            </div>
            <div className="balance">
                Your current balance is ${balance}
            </div>
        </div>
        )
}
