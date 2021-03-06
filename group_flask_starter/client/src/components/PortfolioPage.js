import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import Logo from "../robinhood-logomark-white.png"
import SearchBar from './SearchBar'
import greenLogo from "../robinhood-logomark-green.png"
import WatchList from "./WatchList"
import {connect} from 'react-redux'
import {getWatchList, getNews, getStocks} from '../store/stockReducer'
import StockChartHomePage from './StockChartHomePage'
import NewsFeed from './NewsFeed'
import AccountDropDown from './AccountDropDown'

class PortfolioPage extends React.Component{
  componentDidMount(){
    this.props.getWatchList(this.props.auth);
    this.props.getNews();
    this.props.getStocks(this.props.auth);
  }

  linkToPage = (link) => {
    return <Redirect to={link}/>
  }

  hideAccount = (e) =>{
    e.preventDefault();
    let accountLi = document.getElementById('account-drop-down-li');
    accountLi.style.display = "none";
  }
  showAccount = (e) =>{
    e.preventDefault();
    let accountLi = document.getElementById('account-drop-down-li');
    accountLi.style.display = "flex";
  }
  render(){
    if (this.props.watchlist && this.props.news && this.props.user){
      let random = Math.floor(Math.random() * Math.floor((this.props.watchlist.tickers).length))
  return (
    <div className="portfolio-page" style= {{backgroundColor: '#040F15'}}>
        <div className="nav-bar">
        <nav>
            <ul className="nav-list">
                <li className="home-logo-li">
                  <NavLink to="/" activeclass="active">
                  <img
                  className="home-logo"
                  src={Logo}
                  alt=""
                  />
                  <img
                  className="green-home-logo"
                  src={greenLogo}
                  alt=""
                  hidden
                  />
                  </NavLink></li>
                <li className="search"><SearchBar></SearchBar></li>
                <li className="account"><button onClick={this.showAccount} activeclass="active" className='user-account-button'>Account</button></li>
                <li id={'account-drop-down-li'} hidden><AccountDropDown user={this.props.user}></AccountDropDown></li>
                <li className="portfolio"><NavLink to={`/user/${this.props.auth}`} activeclass="active" className = 'portfolio-button'>Portfolio</NavLink></li>
            </ul>
        </nav>
        </div>
        <div onClick={this.hideAccount}>
        <div id={'stock-chart-homepage-div'}>
          <StockChartHomePage className='stock-chart-homepage' ticker={this.props.watchlist.tickers[random]}></StockChartHomePage>
        </div>
        <div id={'news-feed-div-homepage'}>
          <NewsFeed news={this.props.news}></NewsFeed>
        </div>
        <div>
        <div className = 'watch-list-div'>
          <WatchList watchlist={this.props.watchlist} userId={this.props.auth} linkFunc={this.linkToPage}></WatchList>
        </div>
        </div>
        </div>
    </div>
  );}
  else {
    return (    <div className="portfolio-page" style= {{backgroundColor: '#040F15'}}>
    <div className="nav-bar">
    <nav>
        <ul className="nav-list">
            <li className="home-logo-li">
              <NavLink to="/" activeclass="active">
              <img
              className="home-logo"
              src={Logo}
              alt=""
              />
              <img
              className="green-home-logo"
              src={greenLogo}
              alt=""
              hidden
              />
              </NavLink></li>
            <li className="search"><SearchBar></SearchBar></li>
            <li className="account" ><button onClick={this.showAccount} activeclass="active" className='user-account-button'>Account</button></li>
            <li id={'account-drop-down-li'} hidden><AccountDropDown user={this.props.user}></AccountDropDown></li>
            <li className="portfolio"><NavLink to="/" activeclass="active" className = 'portfolio-button'>Portfolio</NavLink></li>
        </ul>
    </nav>
    </div>
    <div onClick={this.hideAccount}>
    <div id={'stock-chart-homepage-div'}>
      <StockChartHomePage className='stock-chart-homepage' ticker={'AAPL'}></StockChartHomePage>
    </div>
    <div>
    <div className = 'watch-list-div'>
    </div>
    <div id={'news-feed-div-homepage'}>
          <NewsFeed news={this.props.news}></NewsFeed>
        </div>
    </div>
    </div>
</div>)
  }
}
}
const mapStateToProps = (state) => ({
  watchlist: state.stock.watchlist,
  auth: state.auth.id,
  news: state.stock.news,
  user: state.auth
});

const mapDispatchToProps = (dispatch) => {
  return {
    getWatchList: (userId) => dispatch(getWatchList(userId)),
    getNews: () => dispatch(getNews()),
    getStocks: (userId) => dispatch(getStocks(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioPage);
