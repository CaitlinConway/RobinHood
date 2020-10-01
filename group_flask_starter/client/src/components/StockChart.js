import React, {useEffect, useState} from "react";
import {LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Line} from "recharts";
import StockPrice from "./StockPrice";

export default function StockChart(props) {
    let ticker = props.ticker;
    const [stockData, setStockData] = useState("");
    useEffect(()=> {
        async function getStock() {
            const res = await fetch(`/api/stocks/${ticker}`);
            const data = await res.json();
            setStockData(data.values)
            return data;
        }

        getStock()

    }, [ticker])

    const hidePrice = e => {
        let price = document.getElementById("current-price");
        price.classList.add("hidden")
    }

    const showPrice = e => {
        let price = document.getElementById("current-price");
        price.classList.remove("hidden")
    }

    const showTooltipData = (data) => {
        if ( data?.payload && typeof data?.payload[0] != 'undefined') {
        return (<StockPrice first={stockData[0]?.closing} price={data.payload[0].payload.closing} name={props.name}/>)
        }
    }

    return (
        !stockData ? (<div className="spaceholder"/>) :
            <div className="stock-chart">
                <div className="stock-price-container">
                    <div className="stock-name">{props.name}</div>
                    <div className="stock-price" id="current-price">{"$" + props.stockPrice?.toFixed(2)}</div>
                </div>
                    <ResponsiveContainer width="100%" height={500} >
                        <LineChart data={stockData} onMouseOver={hidePrice} onMouseOut={showPrice}>
                            <XAxis dataKey="time" stroke="#dfdfdf"/>
                            <YAxis dataKey="closing" domain={["datamin", "auto"]} hide={true}/>
                            <Tooltip content={showTooltipData} position={{"x": 25, "y": 0}} animationDuration={2500}/>
                            <Line stroke={props.stockPrice > stockData[0].closing ? "#03C805" : "#FF5103"}
                                  strokeWidth={1.8} yAxisId={0} dot={false} type="monotone" dataKey="closing" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
    )
}
