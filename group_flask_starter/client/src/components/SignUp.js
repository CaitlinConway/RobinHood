import React, { Component } from "react";
import { connect } from "react-redux";
import { signUp, login } from "../store/authReducer";
import { Redirect } from "react-router-dom";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        };
    }

    updateFirstName = (e) => {
        this.setState({ firstName: e.target.value });
    };

    updateLastName = (e) => {
        this.setState({ lastName: e.target.value });
    };

    updateEmail = (e) => {
        this.setState({ email: e.target.value });
    };

    updatePassword = (e) => {
        this.setState({ password: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, lastName, email, password} = this.state;
        this.props.signUp(firstName, lastName, email, password);
        const errorsContainer = document.getElementById("errors");
        if (errorsContainer.style.display === "none") {
          window.location.href = "/";
        }
    };

    render() {
        const { firstName, lastName, email, password } = this.state;
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
                  value={firstName}
                  onChange={this.updateFirstName}
                  placeholder="First name"
                ></input>
                <input
                  className="signup-input-last-name"
                  type="text"
                  value={lastName}
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
            <div className="signup-page-testimonial-container">
                <div className="signup-page-testimonial-header">Commission-free stock trading</div>
                <div className="signup-page-testimonial-header">Account Protection</div>
                <div className="signup-page-testimonial-header">Keep tabs on your money</div>
                <div className="signup-page-testimonial">
                    We’ve cut the fat that makes other brokerages costly, like manual account management
                    and hundreds of storefront locations, so we can offer zero commission trading.</div>
                <div className="signup-page-testimonial">
                    Robinhood Financial is a member of SIPC.
                    Securities in your account are protected up to $500,000. For details, please see www.sipc.org.</div>
                <div className="signup-page-testimonial">
                    Set up customized news and notifications to stay on top of your assets as casually or as
                    relentlessly as you like. Controlling the flow of info is up to you.</div>
            </div>
          </div>
        );
      }
    }

// Un-comment when store is setup.

const mapStateToProps = (state) => {
    return {
      loggedIn: !!state.auth.id,
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
      signUp: (firstName, lastName, email, password) =>
        dispatch(signUp(firstName, lastName, email, password)),
      login: (email, password) => dispatch(login(email, password)),
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

// Delete this export when state is implemented.
// export default SignUp;
