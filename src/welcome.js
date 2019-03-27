import React from 'react'
import {HashRouter, Route} from 'react-router-dom'
import Login from './components/Welcome/Login'
import Register from './components/Welcome/Register'
import WelcomeScreen from './components/Welcome/WelcomeScreen'

export function Welcome() {
  return (
    <div id="welcome">
      <HashRouter>
        <div className="welcomeContainer">
          <div
            className="blackVail"
            style={{
              zIndex: '-1',
              opacity: '0.65'
            }}
          />
          <div
            style={{
              zIndex: '-3',
              width: '100%',
              height: '100%',
              backgroundImage: "url('/assets/backgroundImage.jpg')",
              backgroundSize: 'cover',
              position: 'absolute',
              filter: 'brightness(50%)'
            }}
          />
          <div className="welcomePageLogoImgContainer">
            <img
              src="/pinAppLogo.png"
              alt="pinAppLogo"
              className="welcomePageLogoImg"
            />
          </div>
          <Route exact path="/" component={WelcomeScreen} />
          <Route exact path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </div>
      </HashRouter>
    </div>
  )
}
