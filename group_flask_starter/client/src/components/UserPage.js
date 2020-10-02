import React from 'react';
import { BrowserRouter,  NavLink, Redirect } from 'react-router-dom';
import Logo from "../robinhood-logomark-white.png"
import greenLogo from "../robinhood-logomark-green.png"
import SearchBar from './SearchBar'
import AccountDropDown from './AccountDropDown'
import {connect} from 'react-redux'
import {logOut} from '../store/authReducer'
import { getStocklist } from '../store/stockReducer';
import { Redirect } from 'react-router-dom';

class UserPage extends React.Component{
  constructor (props){
    super(props);
    this.state = {
      user: this.props.auth,
      stocklist: this.props.stocklist
    }
  }
<<<<<<< HEAD

=======
  logoutButtonHandle = (e) =>{
    e.preventDefault();
    this.props.logOut();
    return <Redirect to="/landing" />

  }
>>>>>>> master
  componentDidMount() {
    this.props.getStocklist(this.props.auth.id);
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
                <li id={'account-drop-down-li'} hidden><AccountDropDown user={this.state.user}></AccountDropDown></li>
                <li><NavLink to="/" activeclass="active" className = 'portfolio-button'>Portfolio</NavLink></li>
            </ul>
          </nav>
          </div>
          <div id="profile-master-container">
            <div id="profile-user-name">{this.state.user.firstName} {this.state.user.lastName}</div>
            <div id="profile-portfolio-value" className="profile-portfolio-header">Total Portfolio Value
              <div id="profile-user-balance">--Portfolio Balance Will Go Here--</div>
            </div>
            <div id="profile-cash-balance-container">
              <div id="profile-cash-balance-header">Cash</div>
              <div id="profile-cash-balance">{this.state.user.balance}</div>
            </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  stocklist: state.stocklist
});

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
    getStocklist: (userId) => dispatch(getStocklist(userId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
