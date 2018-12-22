import React from 'react'
import {Link} from 'react-router-dom'

export default function WelcomeScreen() {
  return (
    <div className="WelcomeScreen">
      <div className="introTextArea">
        <div className="introText">
          On your way you just discovered an amazing restaurant and you want to
          check it out at some point?
        </div>
        Just drop a Pin, save it and come back later.
        <div className="introText" />
        <div className="inARow">
          <Link to="/login" style={{color: 'white'}}>
            <button className="pinAppButton">Login</button>
          </Link>
          <Link to="/register" style={{color: 'white'}}>
            <button className="pinAppButton">Register</button>
          </Link>
        </div>
        <div className="introText">Save and share your favourite places!</div>
      </div>
    </div>
  )
}
