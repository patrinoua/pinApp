import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "./axios";

export function Welcome() {
    return (
        <div id="welcome">
            <HashRouter>
                <div className="welcomeContainer">
                    <img src="/pinAppLogo.png" className="welcomePageLogoImg" />
                    <Route exact path="/" component={Register} />
                    <Route path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}

export function Logo() {
    return (
        <div className="logo">
            <a href="/user">
                {" "}
                <img
                    className="welcomePageLogoImg"
                    src="/pinAppLogo.png"
                />{" "}
            </a>
        </div>
    );
}

export class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    submit() {
        // console.log('trying to register.. (submit)');
        axios
            .post("/register", {
                first: this.first,
                last: this.last,
                email: this.email,
                password: this.password
            })
            .then((response) => {
                if (response.data.success) {
                    // console.log('registered (in welcome.js)');
                    location.replace("/map");
                } else {
                    // console.log('response.data in register error ',response.data.errorMsg);
                    this.setState({
                        error: true,
                        errorMsg: response.data.errorMsg
                    });
                }
            });
    }
    render() {
        return (
            <div className="welcomeForm">
                <h1> Register </h1>
                <div className="error">
                    {this.state.error && (
                        <div className="errMsg">
                            {" "}
                            Ops! {this.state.errorMsg}
                        </div>
                    )}
                </div>
                <input
                    name="first"
                    onChange={this.handleChange}
                    placeholder="first"
                />
                <input
                    name="last"
                    onChange={this.handleChange}
                    placeholder="last"
                />
                <input
                    name="email"
                    onChange={this.handleChange}
                    placeholder="email"
                />
                <input
                    name="password"
                    onChange={this.handleChange}
                    placeholder="password"
                />
                <div className="inARow">
                    <button onClick={this.submit}> Submit </button>
                    <Link to="/login">
                        <button>
                        Log in
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    submit() {
        axios
            .post("/login", {
                email: this.email,
                password: this.password
            })
            .then((response) => {
                if (response.data.success) {
                    // console.log("response.data from login jfghdsgajf",response.data.user);
                    location.replace("/map");
                } else {
                    // console.log("response.data.success from else:",response.data);
                    this.setState({
                        error: true,
                        errorMsg: response.data.errorMsg
                    });
                }
            });
    }
    render() {
        console.log(this.state);
        return (
            <div className="welcomeForm">
                <h1> Login </h1>
                {this.state.error && (
                    <div className="errMsg"> {this.state.errorMsg} </div>
                )}
                <input
                    name="email"
                    onChange={this.handleChange}
                    placeholder="email"
                />
                <input
                    name="password"
                    onChange={this.handleChange}
                    placeholder="password"
                />
                <div className="inARow">
                    <button onClick={this.submit}> Submit </button>
                    <Link to="/">
                        <button>
                        Register
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}
