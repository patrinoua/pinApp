import React from 'react'
import axios from 'axios'
import { WelcomeFormInput } from '../Welcome/elements'
import {
  MailContainer,
  ModalBG,
  ConfirmModal,
  ConfirmModalText,
  StyledLink,
  ΙnputContainer,
  Contact,
  MailMessage
} from './elements'
class About extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.sendMail = this.sendMail.bind(this)
  }
  async sendMail() {
    let message = {
      name: this.name.value,
      mail: this.mail.value,
      subject: this.subject.value,
      message: this.message.value
    }
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
        <ΙnputContainer>
          <Contact>Contact</Contact>
          <div className="secondInputContainer">
            <WelcomeFormInput
              ref={name => {
                this.name = name
              }}
              placeholder="Name *"
              className="mailUserName"
              required
            />
            <WelcomeFormInput
              ref={mail => {
                this.mail = mail
              }}
              type="email"
              placeholder="E-mail *"
              className="mailInput"
              required
            />
            <WelcomeFormInput
              ref={subject => (this.subject = subject)}
              placeholder="Subject"
              className="mailInput"
            />
          </div>
          <MailMessage
            ref={message => {
              this.message = message
            }}
            placeholder="Message"
            required
          />
          <div className="mailButton">
            <a href="#modal">
              <button onClick={this.sendMail}>Send</button>
            </a>
          </div>
        </ΙnputContainer>
      </MailContainer>
    )
  }
}

export default About
