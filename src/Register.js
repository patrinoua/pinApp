import React from 'react'
import {Link} from 'react-router-dom'
import axios from './axios'

export default class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.submit = this.submit.bind(this)
  }
  handleChange(e) {
    this[e.target.name] = e.target.value
  }
  submit() {
    axios
      .post('/register', {
        first: this.first,
        last: this.last,
        email: this.email,
        password: this.password
      })
      .then(response => {
        if (response.data.success) {
          location.replace('/')
        } else {
          this.setState({
            error: true,
            errorMsg: response.data.errorMsg
          })
        }
      })
  }
  render() {
    document.addEventListener('keypress', e => {
      if (e.keyCode === 13) {
        this.submit()
      }
    })
    return (
      <div className="welcomeForm">
        <div className="welcomeText"> Register </div>
        Create an account to save your pins
        <div className="error">
          {this.state.error && (
            <div className="errMsg"> Ops! {this.state.errorMsg}</div>
          )}
        </div>
        <input
          name="first"
          onChange={this.handleChange}
          placeholder="First name"
        />
        <input
          name="last"
          onChange={this.handleChange}
          placeholder="Last name"
        />
        <input name="email" onChange={this.handleChange} placeholder="Email" />
        <input
          name="password"
          onChange={this.handleChange}
          placeholder="Password"
          type="password"
        />
        {/*<div className="inARow">*/}
        <button onClick={this.submit} className="pinAppButton">
          {' '}
          Submit{' '}
        </button>
        <Link to="/login" style={{color: 'white'}}>
          Login
        </Link>
      </div>
    )
  }
}
