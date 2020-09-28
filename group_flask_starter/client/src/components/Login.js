import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email: "",
          password: "",
        };
      }

handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  };

  updateEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  updatePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  demoUserLogin = (e) => {
    e.preventDefault();
    const email = "demouser@demouser.com";
    const password = "password";
    this.props.login(email, password);
  }

  render() {
    if (this.props.loggedIn) return <Redirect to="/"></Redirect>;
    const { email, password } = this.state;
    return (
      <div className="login-page-div">
        <div className="login-page">
          <div className="page-header-login">Welcome to Robinhood</div>
          <div className="error-container">
            <ul id="errors" className="errors"></ul>
          </div>
          <div className="login-form-div">
            <form onSubmit={this.handleSubmit} className="login-form">
              <input
                type="text"
                value={email}
                onChange={this.updateEmail}
                placeholder="Email or username"
              ></input>
              <div>
              <input
                type="password"
                value={password}
                onChange={this.updatePassword}
                placeholder="Password"
              ></input>
              </div>
              <div className="sign-in-button-div">
                <button type="submit" className="button">
                  Sign In
                </button>
              </div>
            </form>
          </div>
          <div className="no-account">
            Forgot your username or password?
            <form onSubmit={this.demoLogin} className="demo-user-form">
              <button type="submit">Log in as Demo User</button>
            </form>
            <form action="/signup">
              <button>Sign In</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

// const mapStateToProps = (state) => {
//     return {
//       loggedIn: !!state.auth.id,
//     };
//   };

//   const mapDispatchToProps = (dispatch) => {
//     return {
//       login: (email, password) => dispatch(login(email, password)),
//     };
//   };

  export default Login;
