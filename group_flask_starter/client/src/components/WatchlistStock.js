import React, {useEffect, useState} from "react";
import {LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Line} from "recharts";
import StockPrice from "./StockPrice";

export default function WatchListStock({stock}) {
  const [stockData, setStockData] = useState("");
  const [stockPrice, setStockPrice] = useState("0");
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
      <p>{stock}</p>
      <p>{stockPrice}</p>
      </div>
    </>
    )
  }
