import React, {useEffect, useState} from "react";
import StockChart from "./StockChart";

export default function StockPage(props) {
    let ticker = props.match.params.stockId;
    const [companyData, setCompanyData] = useState({})

    useEffect(()=> {
        async function getProfile() {
            const res = await fetch(`/api/stocks/profile/${ticker}`);
            if(res.ok) {
                const data = await res.json()
                setCompanyData(data.values)
            }
        }
        getProfile()
    }, [ticker])

    return (
        <div className="stock-page">
            <div className="stock-chart-container" >
                <StockChart ticker={ticker} name={companyData.name}/>
            </div>
        </div>
    )
}
