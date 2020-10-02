import React from 'react';
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
  logoutButtonHandle = (e) =>{
    e.preventDefault();
    this.props.logOut();
    return <Redirect to="/landing" />

  }
  componentDidMount() {
    this.props.getStocklist(this.props.auth.id);
  }
  render(){
    return(
    <>

      <div>
        <button id={'logout-button'} onClick={this.logoutButtonHandle}>Logout</button>
      </div>

    </>
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
