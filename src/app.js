import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import MapContainer from './MapContainer'
import { connect } from 'react-redux'
import axios from './axios'
import { ProfilePage, UploadProfilePic } from './profile'
import Header from './components/Header'
import OtherProfile from './components/OtherProfile'
import Friends from './friends'
import OnlineUsers from './onlineUsers'
import { saveUserInfo } from './actions'
import PinClick from './components/PinClick'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.changeImage = this.changeImage.bind(this)
    this.hideUploader = this.hideUploader.bind(this)
    this.toggleUploader = this.toggleUploader.bind(this)
    this.fileToUpload = {}
    this.state.toggleUploader = false
    this.changeInputValues = this.changeInputValues.bind(this)
    this.togglePinClick = this.togglePinClick.bind(this)
  }
  togglePinClick() {
    location.replace('/')
  }
  toggleUploader() {
    this.setState({
      toggleUploader: !this.state.toggleUploader
    })
  }
  changeImage(img) {
    this.setState({
      profilepic: img
    })
  }
  changeInputValues(inputValues) {
    let { id, first, last, email, bio } = inputValues
    this.setState({
      id,
      first,
      last,
      email,
      bio
    })
  }
  hideUploader() {
    this.setState({
      uploaderIsVisible: false
    })
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
    axios.get('/getUser').then(response => {
      if (response.data.success) {
        this.props.dispatch(saveUserInfo(response.data.user))
        this.setState(response.data.user)
      } else {
        console.log('response.data in getUser had an error ', response.data)
      }
    })
  }

  render() {
    return (
      <div className="routeContainer">
        <BrowserRouter>
          <div className="appContainer">
            <Header
              {...this.state}
              toggleUploader={this.toggleUploader}
              makeUploaderVisible={this.showUploader}
              hideUploader={this.hideUploader}
              userMenuPopUpStatus={this.state.toggleUserMenu}
            />

            <Route
              exact
              path="/profile"
              render={() => (
                <ProfilePage
                  {...this.state}
                  toggleUploader={this.toggleUploader}
                  makeUploaderVisible={this.showUploader}
                  hideUploader={this.hideUploader}
                  changeInputValues={this.changeInputValues}
                  changeImage={this.changeImage}
                />
              )}
            />

            <Route path="/friends" component={Friends} />

            <Route
              exact
              path="/user/:id"
              render={x => (
                <React.Fragment>
                  <OtherProfile
                    lat={this.state.lat}
                    lng={this.state.lng}
                    match={x.match}
                    history={x.history}
                    id={this.state.id}
                  />
                </React.Fragment>
              )}
            />
            <Route
              exact
              path="/pin/:encryptedPinId"
              render={x => (
                <PinClick
                  match={x.match}
                  history={x.history}
                  togglePinClick={this.togglePinClick}
                  flag={true}
                />
              )}
            />
            <Route
              exact
              path="/sharedpin/:encryptedPinId"
              render={x => (
                <PinClick
                  match={x.match}
                  history={x.history}
                  togglePinClick={this.togglePinClick}
                  flag={true}
                />
              )}
            />
            <Route exact path="/onlineUsers" component={OnlineUsers} />
            {/*<Route exact path="/chat" component={Chat} />*/}
            <Route
              exact
              path="/"
              render={() => (
                <MapContainer
                  lat={this.state.lat}
                  lng={this.state.lng}
                  {...this.state}
                />
              )}
            />
            <Route
              exact
              path="/map"
              render={() => (
                <MapContainer
                  lat={this.state.lat}
                  lng={this.state.lng}
                  {...this.state}
                />
              )}
            />
          </div>
        </BrowserRouter>

        {this.state.toggleUploader && (
          <UploadProfilePic
            changeImage={this.changeImage}
            hideUploader={this.hideUploader}
            toggleUploader={this.toggleUploader}
          />
        )}
      </div>
    )
  }
}
const mapStateToProps = function(state) {
  return {
    markersArray: state.markersArray
  }
}
export default connect(mapStateToProps)(App)
