import React from 'react'
import { Link } from 'react-router-dom'
import { PinAppButton } from '../../elements'
import { WelcomeScreenContainer, WelcomeText } from '../elements'

export default function WelcomeScreen() {
  return (
    <WelcomeScreenContainer>
      <WelcomeText>Save and share your favourite places!</WelcomeText>
      <Link to="/register" style={{ color: 'white' }}>
        <PinAppButton>Let's go!</PinAppButton>
      </Link>
      <br />
      Already have an account?
      <br />
      <br />
      <Link to="/login" style={{ color: 'white', textDecoration: 'underline' }}>
        Login
      </Link>
    </WelcomeScreenContainer>
  )
}
