import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import StockChart from "./StockChart";
import StockBuy from "./StockBuy";
import SearchBar from "./SearchBar";
import Logo from "../robinhood-logomark-white.png";
import greenLogo from "../robinhood-logomark-green.png";
import AccountDropDrown from './AccountDropDown'


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
        <>
        <div className="nav-bar">
            <nav>
                <ul className="nav-list">
                    <li className="home-logo-li">
                        <NavLink to="/" activeclass="active">
                        <img className="home-logo" src={Logo} alt=""/>
                        <img className="green-home-logo" src={greenLogo} alt="" hidden/>
                        </NavLink>
                    </li>
                    <li className="search"><SearchBar></SearchBar></li>
                    <li><NavLink to="/" activeclass="active" className='user-account-button'>Account</NavLink></li>
                    <li><NavLink to="/" activeclass="active" className = 'portfolio-button'>Portfolio</NavLink></li>
                </ul>
            </nav>
        </div>
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
        </>
    )
}
