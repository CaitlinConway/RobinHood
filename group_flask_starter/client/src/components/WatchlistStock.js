import React, {useEffect, useState} from "react";
import {LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Line} from "recharts";
import StockPrice from "./StockPrice";

export default function StockPage(props) {
    let ticker = props.match.params.stockId;
    const [stockData, setStockData] = useState("");
    useEffect(()=> {
        async function getStock() {
            const res = await fetch(`/api/stocks/${ticker}`);
            const data = await res.json();
            console.log(data);
            setStockData(data.values)
            return data;
        }
        getStock()
    }, [ticker])

    return (
      <div>
          <div className="stock-chart-container">
            <div className="stock-chart">
                {/* <StockPrice/> */}
                <ResponsiveContainer width="100%" height={500}>
                    <LineChart data={stockData}>
                        <XAxis dataKey="time"/>
                        <YAxis dataKey="closing" domain={["datamin", "auto"]}/>
                        <Tooltip position={{ x: 100, y: 0 }}/>
                        <Line type="monotone" dataKey="closing" stroke="#88DEFB" strokeWidth={1.8} yAxisId={0} dot={false}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    )
  }
