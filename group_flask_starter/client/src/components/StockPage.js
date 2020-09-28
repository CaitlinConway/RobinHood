import React, {useEffect, useState} from "react"
import {LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Line} from "recharts"

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
        <div className="stock-chart">
            <ResponsiveContainer width="50%" height={500} >
                <LineChart data={stockData}>
                    <XAxis dataKey="time" />
                    <YAxis dataKey="closing" />
                    <Tooltip />
                    {/* <CartesianGrid stroke="#f5f5f5" /> */}
                    <Line type="monotone" dataKey="closing" stroke="#88DEFB" yAxisId={0} dot={false}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
