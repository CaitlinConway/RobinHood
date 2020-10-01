import React, { Component } from "react";
import { connect } from "react-redux";
import { signUp, login } from "../store/authReducer";
import { Redirect } from "react-router-dom";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            errors: ""
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
        if (e.target.value.length < 8 && e.target.value.length > 0) {
            this.setState({ errors: "Your password must be at least 8 characters."});
        } else {
            this.setState({ errors: ""});
        }
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
        const { firstName, lastName, email, password, errors } = this.state;
        return (
          <div className="signup-page">
            <img src=""></img>
            <div className="signup-form-content">
                <div className="signup-form-header">Make Your Money Move</div>
                <div className="signup-form-tag">Batmanhood lets you invest in vigilante justice, criminal-free.</div>
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
                        {/* <div className="signup-error-container">
                        <ul id="errors" className="errors">{errors}</ul>
                        </div> */}
                        <button type="submit" className="signup-button">
                            Continue
                        </button>
                        <span className="signup-text">Already a registered crime-fighter?
                        <a href="/login" className="login-link">Login to your account here.</a></span>
                    </form>
                </div>
            </div>
            <div className="signup-error-container">
                <ul id="errors" className="errors">{errors}</ul>
            </div>
            <div className="signup-page-testimonial-container">
                <div className="signup-page-testimonial-content">
                    <div className="signup-page-testimonial-header">Commission-free stock trading</div>
                    <div className="signup-page-testimonial">
                        We’ve cut the fat that makes other brokerages costly, like manual account management
                        and hundreds of storefront locations, so we can offer zero commission trading.</div>
                    <div className="signup-page-testimonial-header">Account Protection</div>
                    <div className="signup-page-testimonial">
                        Batmanhood Financial is a member of SIPC.
                        Securities in your account are protected up to $500,000. For details, please see <a className="signup-link" href="https://www.sipc.org/" target="_blank">www.sipc.org</a>.</div>
                    <div className="signup-page-testimonial-header">Keep tabs on your money</div>
                    <div className="signup-page-testimonial">
                        Set up customized news and notifications to stay on top of your assets as casually or as
                        relentlessly as you like. Controlling the flow of info is up to you.</div>
                    </div>
            </div>
            <div className="signup-page-fine-print">
                <p>
                All investments involve risk and the past performance of a security, or financial product does not guarantee
                future results or returns. Keep in mind that while diversification may help spread risk it does not assure a
                profit, or protect against loss, in a down market. There is always the potential of losing money when you invest
                in securities, or other financial products. Investors should consider their investment objectives and risks carefully
                before investing.
                </p>
                <p>
                All securities and investments are offered to self-directed customers by Batmanhood Financial, LLC, member <a className="signup-link" href="https://www.finra.org/" target="_blank">FINRA</a> & <a className="signup-link" href="https://www.sipc.org/" target="_blank">SIPC</a>.
                Additional information about your broker can be found by clicking <a className="signup-link" href="https://brokercheck.finra.org/" target="_blank">here</a>. Batmanhood Financial, LLC is a wholly owned subsidiary
                of Batmanhood Markets, Inc.
                </p>
                <p>
                Check the background of Batmanhood Financial LLC and Batmanhood Securities, LLC on <a className="signup-link" href="https://brokercheck.finra.org/" target="_blank">FINRA's BrokerCheck</a>.
                </p>
                <p>
                © 2020 Batmanhood. All rights reserved unless you want this stuff then by all means go for it.
                </p>
            </div>
          </div>
        );
      }
    }

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
