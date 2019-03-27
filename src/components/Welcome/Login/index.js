import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../../../axios'
import { PinAppButton, ErrorMessage } from '../../../elements'
import { WelcomeForm, WelcomeFormText, WelcomeFormInput } from '../elements.js'
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
      <WelcomeForm>
        <WelcomeFormText> Login </WelcomeFormText>
        {this.state.error && (
          <ErrorMessage> {this.state.errorMsg} </ErrorMessage>
        )}
        <WelcomeFormInput
          name="email"
          onChange={this.handleChange}
          placeholder="Email"
        />
        <WelcomeFormInput
          name="password"
          onChange={this.handleChange}
          placeholder="Password"
          type="password"
        />
        <PinAppButton onClick={this.submit}> Submit </PinAppButton>
        <Link to="/" style={{ color: 'white' }}>
          Register
        </Link>
      </WelcomeForm>
    )
  }
}
