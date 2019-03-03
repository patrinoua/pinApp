import React from 'react'
import {connect} from 'react-redux'
import axios from './axios'
import {FriendButton} from './friendButton'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react'
import {getUserPinInfo, selectActionBycategory} from './actions'
import ListOfLocations from './ListOfLocations.js'
import PinClick from './components/PinClick'

class OtherProfilePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      arrayOfCategory: [],
      showCategorySelect: false,
      copyOfPinsArray: [],
      // addMyPinLocationVisible: false,
      myLat: null,
      myLng: null,
      // watchId: null,
      // activeMarker: {},
      // selectedPlace: {},
      showingInfoWindow: false,
      addNewPinIsVisible: false,
      clickedPinId: null,
      pinClickVisible: false,
      mapHasBinClicked: false
    }

    this.checkValue = this.checkValue.bind(this)
    this.pinClick = this.pinClick.bind(this)
    this.togglePinClick = this.togglePinClick.bind(this)
    this.showListComponent = this.showListComponent.bind(this)
    this.closeListComponent = this.closeListComponent.bind(this)
  }
  componentDidMount() {
    // console.log('other Profile is loaded.');
    this.whatToDoOnLoad(this.props.match.params.id)
  }
  whatToDoOnLoad(id) {
    axios
      .get(`/getUser/${id}`)
      .then(response => {
        this.setState({user: response.data.user})
      })
      .catch(err => {
        console.log(`error in getUser: ${err}`)
      })
    axios
      .get(`/getUserPins`, {
        params: {id: id}
      })
      .then(response => {
        this.setState({
          copyOfPinsArray: response.data.marker
        })
      })
      .catch(err => {
        console.log(`error in getPinInfo (otherProfile): ${err}`)
      })
    this.props.dispatch(getUserPinInfo(id))
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.whatToDoOnLoad(nextProps.match.params.id)
      return
    }
    return
  }
  pinClick(e) {
    this.clickedPinId = e.name
    this.setState({
      clickedPinId: e.name,
      pinClickVisible: !this.state.pinClickVisible
    })
  }
  togglePinClick() {
    this.setState({
      pinClickVisible: !this.state.pinClickVisible
    })
  }
  checkValue(e) {
    if (e.target.checked) {
      this.state.arrayOfCategory.push(e.target.value)
    } else {
      this.state.arrayOfCategory = this.state.arrayOfCategory.filter(item => {
        return item !== e.target.value
      })
    }
    this.props.dispatch(
      selectActionBycategory(
        this.state.arrayOfCategory,
        this.state.copyOfPinsArray
      )
    )
  }
  showListComponent() {
    console.log('setting to true')
    this.setState({
      showListComponent: true
    })
  }
  closeListComponent(e) {
    this.setState({
      showListComponent: false
    })
  }
  render() {
    if (!this.state.user) {
      return <h1>no such user found</h1>
    }
    const style = {
      backgroundSize: 'contain',
      backgroundColor: 'pink',
      borderRadius: '2px',
      width: '100%',
      height: '100%'
    }
    const categoryItems = function(color, text, variable, myFunction) {
      let str = '/pins/' + color + 'Pin.png'
      return (
        <div className="categoryItem">
          <input
            type="checkbox"
            id={variable}
            name={variable}
            value={variable}
            className="check"
            onClick={myFunction}
          />
          <img
            src={str}
            alt="categoryItemPinIcon"
            className="categoryItemPinIcon"
          />
          <label htmlFor="museums" className="pinText">
            {' '}
            {text}{' '}
          </label>
        </div>
      )
    }
    const userAvatar = this.state.user.profilepic || '/user.png'
    const profilePicStyle = {
      backgroundImage: `url(${userAvatar})`
    }

    return (
      <React.Fragment>
        {this.state.showListComponent && (
          <ListOfLocations
            closeListComponent={this.closeListComponent}
            id={this.props.id}
            first={this.state.user.first}
            togglePinClick={this.togglePinClick}
          />
        )}
        {this.state.pinClickVisible &&
          this.state.clickedPinId && (
            <PinClick
              pinId={this.state.clickedPinId}
              togglePinClick={this.togglePinClick}
              id={this.props.id}
            />
          )}
        <div className="componentContainer">
          <div className="otherUserContainer">
            <div className="otherUserContainerUp">
              <div className="profilePicUser" style={profilePicStyle} />
              <div className="nameAndBioContainerUser">
                <div className="nameUser">
                  {this.state.user.first} {this.state.user.last}
                </div>
                <div className="bioUser">{this.state.user.bio}</div>
              </div>

              <div className="otherUserContainerFriendshipButton">
                <FriendButton otherId={this.props.match.params.id} />
              </div>
            </div>
            <div className="otherUserContainerDown">
              <div className="otherUserContainerDownLeft">
                <div className="categoryListUser">
                  <form id="myForm">
                    {categoryItems(
                      'blue',
                      'museums',
                      'museums',
                      this.checkValue
                    )}
                    {categoryItems('green', 'Parks', 'parks', this.checkValue)}
                    {categoryItems(
                      'yellow',
                      'restaurants',
                      'restaurants',
                      this.checkValue
                    )}
                    {categoryItems('pink', 'bars', 'bars', this.checkValue)}
                    {categoryItems(
                      'purple',
                      'sightseeing',
                      'sightseeing',
                      this.checkValue
                    )}
                  </form>
                </div>
                <button
                  className="pinAppButton"
                  onClick={this.showListComponent}
                >
                  {this.state.user.first}'s Pins
                </button>
              </div>
              <div className="otherUserContainerDownRight">
                <div className="mapAreaUser">
                  <Map
                    style={style}
                    initialCenter={{
                      // lat: this.props.lat,
                      // lng: this.props.lng
                      lat: 52.4918854,
                      lng: 13.360088699999999
                    }}
                    zoom={14}
                    google={this.props.google}
                    onClick={this.mapClicked}
                    onReady={this.fetchPlaces}
                    visible={true}
                  >
                    {this.state.myLat && (
                      <Marker
                        icon={{
                          url: '/dot.png',
                          anchor: new google.maps.Point(0, 0),
                          scaledSize: new google.maps.Size(10, 10)
                        }}
                      />
                    )}
                    {this.props.markersArray &&
                      this.props.markersArray.map(item => {
                        return (
                          <Marker
                            key={item.id}
                            onClick={this.pinClick}
                            name={item.id}
                            position={{
                              lat: item.lat,
                              lng: item.lng
                            }}
                            icon={{
                              url: item.color,
                              anchor: new google.maps.Point(15, 35),
                              scaledSize: new google.maps.Size(25, 35)
                            }}
                          />
                        )
                      })}
                  </Map>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    markersArray: state.markersArray
    // pins: state.onlineUsers
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAM59_tOly6RmV6eSBYguDKRMukEgQ20d'
})(connect(mapStateToProps)(OtherProfilePage))
