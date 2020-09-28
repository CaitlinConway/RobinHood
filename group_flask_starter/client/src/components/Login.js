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
    const email = "DemoUser@demouser.com";
    const password = "password";
    this.props.login(email, password);
  }

  render() {
    if (this.props.isLoggedIn) return <Redirect to="/"></Redirect>;
    const { email, password } = this.state;
    return (
      <div className="login-page">
        <div className="login-page-div">
          <div className="login-form-header">Welcome to Robinhood</div>
          <div className="error-container">
            <ul id="errors" className="errors"></ul>
          </div>
          <div className="login-form-email-header">Email</div>
          <div className="login-form-div">
            <form onSubmit={this.handleSubmit} className="login-form">
              <input
                className="login-input-email"
                type="email"
                value={email}
                onChange={this.updateEmail}
              ></input>
              <div className="login-form-password-header">Password</div>
              <div>
              <input
                className="login-input-password"
                type="password"
                value={password}
                onChange={this.updatePassword}
              ></input>
              </div>
              <div className="forgot-account">
                Forgot your email or password?
              </div>
              <div className="login-sign-in-button">
                <button type="submit" className="login-button">
                  Sign In
                </button>
              </div>
            </form>
          </div>
            <form onSubmit={this.demoLogin} className="demo-user-form">
              <button type="submit"
              className="demo-user-login-button">
              Demo User
              </button>
            </form>
          </div>
      </div>
    );
  }
};

// Un-comment these mapping properties when state is implemented.

// const mapStateToProps = (state) => {
//     return {
//       isLoggedIn: !!state.auth.id,
//     };
//   };

//   const mapDispatchToProps = (dispatch) => {
//     return {
//       login: (email, password) => dispatch(login(email, password)),
//     };
//   };

// export default connect(mapStateToProps, mapDispatchToProps)(Login);

// Delete this export when state is implemented.
export default Login;