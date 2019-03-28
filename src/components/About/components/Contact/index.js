import React from 'react'
import axios from 'axios'

import {
  Headline,
  MailContainer,
  StyledInput,
  ModalBG,
  ConfirmModal,
  ConfirmModalText,
  StyledLink,
  InputContainer,
  MailMessage,
  MailButton
} from './elements'

export default class Contact extends React.Component {
  constructor() {
    super()
    this.state = { error: false }
    this.sendMail = this.sendMail.bind(this)
  }
  async sendMail() {
    let message = {
      name: this.name.value,
      mail: this.mail.value,
      subject: this.subject.value,
      message: this.message.value
    }
    if (
      message.name.length > 0 &&
      message.mail.length > 0 &&
      message.message.length > 0
    ) {
      try {
        const response = await axios.post('/api/mail', message)
        if (!response.data.success) {
          console.log('No success')
        }
        this.setState({
          mailSent: true
        })
      } catch (e) {
        console.log(e)
      }
    } else {
      this.setState({
        error: true
      })
    }
  }
  render() {
    return (
      <MailContainer>
        {this.state.mailSent && (
          <ModalBG>
            <ConfirmModal>
              <ConfirmModalText>Your email was sent!</ConfirmModalText>
              <StyledLink
                to="/"
                onClick={() => {
                  this.setState({
                    mailSent: false
                  })
                }}
              >
                OK
              </StyledLink>
            </ConfirmModal>
          </ModalBG>
        )}
        <InputContainer>
          {this.props.children}
          <div>
            <StyledInput
              ref={name => {
                this.name = name
              }}
              placeholder="Name*"
              className="mailUserName"
              required
            />
            <StyledInput
              ref={mail => {
                this.mail = mail
              }}
              type="email"
              placeholder="E-mail*"
              className="mailInput"
              required
            />
            <StyledInput
              ref={subject => (this.subject = subject)}
              placeholder="Subject"
              className="mailInput"
            />
          </div>
          <MailMessage
            ref={message => {
              this.message = message
            }}
            placeholder="Message*"
            required
          />
          <MailButton onClick={this.sendMail}> Send </MailButton>
          {this.state.error && <div>Please fill in all required fields</div>}
        </InputContainer>
      </MailContainer>
    )
  }
}
