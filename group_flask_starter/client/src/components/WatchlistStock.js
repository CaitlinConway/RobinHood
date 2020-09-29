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

  const showTooltipData = (data) => {
      if ( data?.payload && typeof data?.payload[0] != 'undefined') {
      return (<StockPrice price={data.payload[0].payload.closing} name={stock}/>)
      }
  }
    return (
    <>
    <div className = 'individual-watchlist-div'>
      <p>{stock}</p>
      <div id={'wishlist-chart'}>
      <ResponsiveContainer width="100%" height={100} >
                        <LineChart data={stockData}>
                            <XAxis dataKey="time"/>
                            <YAxis dataKey="closing" domain={["datamin", "auto"]} hide={true}/>
                            <Tooltip content={showTooltipData} position={{"x": 25, "y": 0}} animationDuration={2500}/>
                            <Line type="monotone" dataKey="closing" stroke="#03C805" strokeWidth={1.8} yAxisId={0} dot={false}/>
                        </LineChart>
                    </ResponsiveContainer>
        </div>
      <p>{stockPrice}</p>
      </div>
    </>
    )
  }
