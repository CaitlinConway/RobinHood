import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            first_name: "",
            last_name: "",
            email: "",
            password: ""
        };
    }

    updateFirstName = (e) => {
        this.setState({ first_name: e.target.value });
    };

    updateLastName = (e) => {
        this.setState({ last_name: e.target.value });
    };

    updateEmail = (e) => {
        this.setState({ email: e.target.value });
    };

    updatePassword = (e) => {
        this.setState({ password: e.target.value });
    };

      handleSubmit = async (e) => {
        e.preventDefault();
        const { first_name, last_name, email, password} = this.state;
        this.props.signup(first_name, last_name, email, password);
        const errorsContainer = document.getElementById("errors");
        if (errorsContainer.style.display === "none") {
          window.location.href = "/";
        }
    };

    render() {
        const { first_name, last_name, email, password } = this.state;
        return (
          <div className="signup-page">
            <img src=""></img>
            <div className="signup-form-content">
            <div className="signup-form-header">Make Your Money Move</div>
            <div className="signup-form-tag">Robinhood lets you invest in companies you love, commission-free.</div>
            <div className="error-container">
              <ul id="errors" className="errors"></ul>
            </div>
            <div className="signup-form-div">
              <form onSubmit={this.handleSubmit} className="signup-form">
                <input
                  className="signup-input-first-name"
                  type="text"
                  value={first_name}
                  onChange={this.updateFirstName}
                  placeholder="First name"
                ></input>
                <input
                  className="signup-input-last-name"
                  type="text"
                  value={last_name}
                  onChange={this.updateLastName}
                  placeholder="Last name"
                ></input>
                <div className="break"></div>
                <input
                  className="signup-input-email"
                  type="email"
                  value={email}
                  onChange={this.updateEmail}
                  placeholder="Email"
                ></input>
                <div className="break"></div>
                <input
                  className="signup-input-password"
                  type="password"
                  value={password}
                  onChange={this.updatePassword}
                  placeholder="Password (min. 10 characters)"
                ></input>
                <div className="break"></div>
                <div className="sign-up-button-div">
                  <button type="submit" className="button">
                    Sign Up!
                  </button>
                </div>
              </form>
            </div>
            <div className="existing-account">
              Already have an account?
              <form action="/login">
                <button>Log In!</button>
              </form>
            </div>
            </div>
          </div>
        );
      }
    }

// Un-comment when store is setup.

// const mapStateToProps = (state) => {
//     return {
//       loggedIn: !!state.auth.id,
//     };
//   };

//   const mapDispatchToProps = (dispatch) => {
//     return {
//       signup: (first_name, last_name, email, password) =>
//         dispatch(signup(first_name, last_name, email, password)),
//       login: (email, password) => dispatch(login(username, password)),
//     };
//   };

//   export default connect(mapStateToProps, mapDispatchToProps)(Signup);

// Delete this export when state is implemented.
export default SignUp;
