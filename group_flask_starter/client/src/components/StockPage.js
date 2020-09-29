import React, {useEffect, useState} from "react";
import {LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Line} from "recharts";
import StockPrice from "./StockPrice";

export default function StockPage(props) {
    let ticker = props.match.params.stockId;
    const [stockData, setStockData] = useState("");
    const [stockPrice, setStockPrice] = useState(0);
    useEffect(()=> {
        async function getStock() {
            const res = await fetch(`/api/stocks/${ticker}`);
            const data = await res.json();
            setStockData(data.values)
            return data;
        }
        async function getCurrentPrice() {
            const res = await fetch(`/api/stocks/current/${ticker}`);
            if(res.ok) {
                const data = await res.json()
                setStockPrice(data.values.c)
            }

        }
        getStock()
        getCurrentPrice()
    }, [ticker])

    const showTooltipData = (data) => {
        if ( data?.payload && typeof data?.payload[0] != 'undefined') {
        //   setStockPrice(data.payload[0].payload.closing);
        return (<StockPrice price={data.payload[0].payload.closing} name={ticker}/>)
        }
    }
    return (
        !stockData ? null :
        <div className="stock-page">
            <div className="stock-chart-container">
                <div className="stock-chart">
                    <div className="stock-price-container">
                        <div className="stock-name">{"amzn"}</div>
                        <div className="stock-price stock-price-current">{"$" + "0"}</div>
                        {/* <div className="stock-return">{`+$${stockData[0].closing - stockData[stockData.length - 1].closing} (+106.48%) Past Year`}</div> */}
                    </div>
                    <ResponsiveContainer width="100%" height={500}>
                        <LineChart data={stockData}>
                            <XAxis dataKey="time"/>
                            <YAxis dataKey="closing" domain={["datamin", "auto"]}/>
                            <Tooltip content={showTooltipData} position={{"x": 100, "y": 0}}/>
                            <Line type="monotone" dataKey="closing" stroke="#03C805" strokeWidth={1.8} yAxisId={0} dot={false}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
