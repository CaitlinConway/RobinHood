import React, {useEffect, useState} from "react";
import { NavLink} from "react-router-dom";
import {LineChart, XAxis, YAxis, ResponsiveContainer, Line} from "recharts";

export default function WatchListStock({stock}) {
  const [stockData, setStockData] = useState([]);
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
      <NavLink id={'watchlist-stock-name'} to={`/stocks/${stock}`} >{stock}</NavLink>
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
