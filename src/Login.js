import React from 'react'
import {Link} from 'react-router-dom'
import axios from './axios'

export default class Login extends React.Component {
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
      .post('/login', {
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
        <div className="welcomeText"> Login </div>
        {this.state.error && (
          <div className="errMsg"> {this.state.errorMsg} </div>
        )}
        <input name="email" onChange={this.handleChange} placeholder="Email" />
        <input
          name="password"
          onChange={this.handleChange}
          placeholder="Password"
          type="password"
        />
        <button onClick={this.submit} className="pinAppButton">
          {' '}
          Submit{' '}
        </button>
        <Link to="/" style={{color: 'white'}}>
          Register
        </Link>
      </div>
    )
  }
}
