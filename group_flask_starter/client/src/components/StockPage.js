import React, {useEffect, useState} from "react";
import StockChart from "./StockChart";
import StockBuy from "./StockBuy"

export default function StockPage(props) {
    let ticker = props.match.params.stockId;
    const [companyData, setCompanyData] = useState({})
    const [stockPrice, setStockPrice] = useState("0");

    useEffect(()=> {
        async function getProfile() {
            const res = await fetch(`/api/stocks/profile/${ticker}`);
            if(res.ok) {
                const data = await res.json()
                setCompanyData(data.values)
            }
        }

        async function getCurrentPrice() {
            const res = await fetch(`/api/stocks/current/${ticker}`);
            if(res.ok) {
                const data = await res.json()
                setStockPrice(data.values.c)
            }
        }

        getProfile()
        getCurrentPrice()

    }, [ticker])

    return (
        <div className="stock-page">
            <div className="stock-details">
                <div className="stock-chart-container" >
                    <StockChart ticker={ticker} name={companyData.name} stockPrice={stockPrice}/>
                </div>
                <div className="company-details-container">
                    <div className="company-about"> About</div>
                    <div className="company-details">
                        <div>
                            <div className="company-ipo"> IPO Date </div>
                            <div> {companyData.ipo}</div>
                        </div>
                        <div>
                            <div className="company-market-cap"> Market Cap (Millions) </div>
                            <div> {companyData.marketCapitalization}</div>
                        </div>
                        <div>
                            <div className="company-website"> Website </div>
                            <a href={companyData.weburl} id="weblink" > {companyData.weburl}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="stock-buy">
                <StockBuy ticker={ticker.toUpperCase()} price={stockPrice} />
            </div>
        </div>
    )
}
