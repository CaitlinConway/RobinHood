import React from 'react';
import {connect} from 'react-redux'
import {logOut} from '../store/authReducer'

class AccountDropDown extends React.Component{
  logoutButtonHandle = (e) =>{
    e.preventDefault();
    this.props.logOut();
  }
  render(){
    return(
    <>
    <div id={'account-drop-down-div'}>
      <div id={'drop-down-username'}>{this.props.user.firstName} {this.props.user.lastName}</div>
      <div id={'drop-down-balance'}>Balance: ${this.props.user.balance}</div>
      <div>
        <button id={'logout-button'} onClick={this.logoutButtonHandle}>Logout</button>
      </div>
    </div>
    </>
    )
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => dispatch(logOut())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountDropDown);
