import React from 'react'
import {Link} from 'react-router-dom'

export default function WelcomeScreen() {
  return (
    <div className="WelcomeScreen">
      <div className="introTextArea">
        <div className="introText">Save and share your favourite places!</div>
          <Link to="/register" style={{color: 'white'}}>
            <button className="pinAppButton">Let's go!</button>
          </Link>
          <br />
          Already have an account?
          <br />
          <br />
          <Link to="/login" style={{color: 'white', textDecoration:'underline'}}>
          Login
          </Link>
        </div>
    </div>
  )
}
