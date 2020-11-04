import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "../robinhood-logomark-white.png"
import greenLogo from "../robinhood-logomark-green.png"
import SearchBar from './SearchBar'
import AccountDropDown from './AccountDropDown'
import {connect} from 'react-redux'
import {addToBalance, logOut, updateBalance } from '../store/authReducer'
import { getStocklist, getStocks } from '../store/stockReducer';

class UserPage extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      user: this.props.auth,
      // stocklist: this.props.stocklist,
      // balance: this.props.auth.balance,
      owned: this.props.stock

    }
  }

  componentDidMount(){
    this.props.getStocks(this.props.auth)
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
    const userId = this.props.auth.id;
    this.props.updateBalance(userId)
  }

  add = (e) => {
    e.preventDefault();
    this.value = e.target.value;
  }

  balanceTotal = async (e) => {
    e.preventDefault();
    const userId = this.props.auth.id
    const inputValue = document.getElementById("profile-add-amount")
    const amount = inputValue.value;
    this.props.addToBalance(amount, userId)
    inputValue.value = "";
}

  updateStocks = async () => {
    const userId = this.props.auth.id
    this.props.getStocks(userId)
  }

  stockLoader = async () => {
    const owned = this.props.stock.owned
    // console.log(owned)
  }


  render() {
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
                {/* <li id={'account-drop-down-li'} hidden><AccountDropDown user={this.state.user}></AccountDropDown></li> */}
                <li id={'account-drop-down-li'} hidden><AccountDropDown user={this.props.user}></AccountDropDown></li>
                <li><NavLink to="/" activeclass="active" className = 'portfolio-button'>Portfolio</NavLink></li>
            </ul>
          </nav>
          </div>
          <div id="profile-master-container">
            <div id="profile-user-name">{this.state.user.firstName} {this.state.user.lastName}</div>
            <div id="profile-cash-balance-container">
              <div id="profile-cash-balance-header">Total Purchasing Power</div>
              <div id="profile-cash-balance">${this.props.auth.balance}</div>
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
                  {/* {(this.state.owned).map((stock) => (
                    <li key={this.owned.stock.indexOf(this.owned)}>
                      <div>{stock}</div>
                    </li>
                  ))} */}
                </ul>
            </div>
        </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  stocklist: state.stocklist,
  user: state.auth,
  balance: state.auth.user
});

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
    getStocklist: (userId) => dispatch(getStocklist(userId)),
    addToBalance: (amount, userId) => dispatch(addToBalance(amount, userId)),
    updateBalance: (userId) => dispatch(updateBalance(userId)),
    getStocks: (userId) => dispatch(getStocks(userId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
