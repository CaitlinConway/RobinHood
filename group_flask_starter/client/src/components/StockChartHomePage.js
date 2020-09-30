import React, {useEffect, useState} from "react";
import {LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Line} from "recharts";
import StockPrice from "./StockPrice";

export default function StockChartHomePage(props) {
    let ticker = props.ticker;
    const [stockData, setStockData] = useState("");
    const [stockPrice, setStockPrice] = useState("0");
    const [companyData, setCompanyData] = useState({})
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

        async function getProfile() {
            const res = await fetch(`/api/stocks/profile/${ticker}`);
            if(res.ok) {
                const data = await res.json()
                setCompanyData(data.values)
            }
        }

        getStock()
        getCurrentPrice()
        getProfile()

    }, [ticker])

    // const hidePrice = e => {
    //     let price = document.getElementById("current-price");
    //     price.classList.add("hidden")
    // }

    // const showPrice = e => {
    //     let price = document.getElementById("current-price");
    //     price.classList.remove("hidden")
    // }

    const showTooltipData = (data) => {
        if ( data?.payload && typeof data?.payload[0] != 'undefined') {
        return (<StockPrice first={stockData[0]?.closing} price={data.payload[0].payload.closing} name={companyData.name}/>)
        }
    }

    return (
        !stockData ? null :
            <div className="stock-chart-info-homepage">
                <div className="stock-name-homepage">{props.ticker}
                </div>
                <div id={'stock-chart-homepage'}>
                    <ResponsiveContainer width="100%" height={500} >
                        <LineChart data={stockData}>
                            <XAxis dataKey="time" stroke="#dfdfdf"/>
                            <YAxis dataKey="closing" domain={["datamin", "auto"]} hide={true}/>
                            <Tooltip content={showTooltipData} position={{"x": 25, "y": 0}} animationDuration={2500}/>
                            <Line stroke={stockPrice > stockData[0].closing ? "#03C805" : "#FF5103"}
                                  strokeWidth={1.8} yAxisId={0} dot={false} type="monotone" dataKey="closing" />
                        </LineChart>
                    </ResponsiveContainer>
                    </div>
                </div>
    )
}
