import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "../robinhood-logomark-white.png"
import greenLogo from "../robinhood-logomark-green.png"
import SearchBar from './SearchBar'
import AccountDropDown from './AccountDropDown'
import {connect} from 'react-redux'
import {addToBalance, logOut, updateBalance } from '../store/authReducer'
import { getWatchList, getNews, getStocks } from '../store/stockReducer';

class UserPage extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      // user: this.props.auth,
      // stocklist: this.props.stocklist,
      balance: this.props.auth.balance,
    }
  }

  componentDidMount(){
    this.props.getWatchList(this.props.auth);
    this.props.getNews();
    this.props.getStocks(this.props.auth);
  }


  logoutButtonHandle = (e) =>{
    e.preventDefault();
    this.props.logOut();
  }


  hideAccount = (e) => {
    e.preventDefault();
    let accountLi = document.getElementById('account-drop-down-li');
    accountLi.style.display = "none";
  }

  showAccount = (e) => {
    e.preventDefault();
    let accountLi = document.getElementById('account-drop-down-li');
    accountLi.style.display = "flex";
  }

  showBalance = (e) => {
    e.preventDefault();
    const userId = this.props.user.id;
    this.props.updateBalance(userId)
  }

  add = (e) => {
    e.preventDefault();
    this.value = e.target.value;
  }

  balanceTotal = async (e) => {
    e.preventDefault();
    const userId = this.props.user.id
    const inputValue = document.getElementById("profile-add-amount")
    const amount = inputValue.value;
    this.props.addToBalance(amount, userId)
    inputValue.value = "";
}

  updateStocks = async () => {
    const userId = this.props.auth.id
    this.props.getStocks(userId)
  }

  // stockLoader = async () => {
  //   const owned = this.props.owned;
  //   let ownedArray = [];
  //   for (const stock in owned) {
  //    ownedArray.push(<li key={this.props.owned.indexOf(this.props.owned)}>
  //       <div>{stock}</div>
  //     </li>)
  //   }
  //   return ownedArray;
  // }


  render() {
    const stockLoader = () => {
      const owned = this.props.owned;
      const values = Object.values(owned)
      const valuesArray = [];
      values.forEach(value => {
        const share = Object.values(value)
        const ticker = Object.keys(value)
        valuesArray.push(
            <li key={values.indexOf(value)}>Stock: {ticker} - Number of Shares: {share[0]}</li>)
         })
      return valuesArray;
    }

    if (this.props.owned) {
    return(
      <div id="user-profile-page">
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
                <li><button onClick={this.showAccount} activeclass="active" className='user-account-button'>Account</button></li>
                <li id={'account-drop-down-li'} hidden><AccountDropDown user={this.props.user}></AccountDropDown></li>
                {/* <li id={'account-drop-down-li'} hidden><AccountDropDown user={this.props.user}></AccountDropDown></li> */}
                <li><NavLink to="/" activeclass="active" className = 'portfolio-button'>Portfolio</NavLink></li>
            </ul>
          </nav>
          </div>
          <div id="profile-master-container">
            <div id="profile-user-name">{this.props.user.firstName} {this.props.user.lastName}</div>
            <div id="profile-cash-balance-container">
              <div id="profile-cash-balance-header">Total Purchasing Power</div>
              <div id="profile-cash-balance">${this.props.user.balance}</div>
            </div>
            <div id="profile-add-balance-container">
              <div id="profile-add-balance">
                <div id="profile-add-balance-header">Add to Your Vigilante Funds:</div>
                  <input id="profile-add-amount"
                  type="number"
                  min="0"
                  max="100000000"
                  step="0.01"
                  onChange={this.add}
                  placeholder="Amount to Add">
                  </input>
                  <button id="profile-add-balance-button" onClick={this.balanceTotal}>Add</button>
              </div>
            </div>
            <div id="portfolio-master-container">
              <div id="owned-stocks-container">
                <h1 id="owned-stocks-header">My Portfolio</h1>
                <ul id="owned-stocks-list">
                  {/* {(this.props.owned).map((stock) => (
                    <li key={this.props.owned.indexOf(this.props.owned)}>
                      <div>{stock}</div>
                    </li>
                  ))} */}
                  {stockLoader()}
                </ul>
            </div>
        </div>
        </div>
      </div>
    )
    } else { return null}
  }
}
const mapStateToProps = (state) => ({
  watchlist: state.stock.watchlist,
  auth: state.auth.id,
  news: state.stock.news,
  stocklist: state.stocklist,
  user: state.auth,
  balance: state.auth.balance,
  owned: state.stock.owned
});

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
    addToBalance: (amount, userId) => dispatch(addToBalance(amount, userId)),
    updateBalance: (userId) => dispatch(updateBalance(userId)),
    getWatchList: (userId) => dispatch(getWatchList(userId)),
    getNews: () => dispatch(getNews()),
    getStocks: (userId) => dispatch(getStocks(userId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
