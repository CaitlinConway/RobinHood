import React, {useEffect, useState} from "react";
import { Link, NavLink, Redirect, useHistory } from "react-router-dom";
import {LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Line} from "recharts";
import StockPrice from "./StockPrice";

export default function WatchListStock({stock}) {
  const history = useHistory();
  const handleStockClick = (e) =>{
    e.preventDefault();
    history.push(`/stocks/${stock}`)
    window.location.href= `/stocks/${stock}`
  }
  const [stockData, setStockData] = useState("");
  const [stockPrice, setStockPrice] = useState("0");
  const stockLink = `/stocks/${stock}`
    useEffect(()=> {
        async function getStock() {
            const res = await fetch(`/api/stocks/${stock}`);
            const data = await res.json();
            setStockData(data.values)
            return data;
        }
        async function getCurrentPrice() {
            const res = await fetch(`/api/stocks/current/${stock}`);
            if(res.ok) {
                const data = await res.json()
                setStockPrice(data.values.c)
            }
        }
        getStock()
        getCurrentPrice()
    }, [stock])
    return (
    <>
    <div className = 'individual-watchlist-div'>
      <button id={'watchlist-stock-name'} onClick={handleStockClick} >{stock}</button>
      <div id={'wishlist-chart'}>
      <ResponsiveContainer width="100%" height={70} >
                        <LineChart data={stockData}>
                            <XAxis dataKey="time" tick={false}/>
                            <YAxis dataKey="closing" domain={["datamin", "auto"]} hide={true} tick={false}/>
                            <Line stroke={stockData.length >1 && stockPrice < stockData[0].closing ? "#FF5103" : "#03C805"}
                                  strokeWidth={1.8} yAxisId={0} dot={false} type="monotone" dataKey="closing" />
                        </LineChart>
                    </ResponsiveContainer>
        </div>
      <p id={'watchlist-stock-price'}>{stockPrice}</p>
      </div>
    </>
    )
  }
