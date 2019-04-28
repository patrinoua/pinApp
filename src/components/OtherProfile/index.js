import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import axios from '../../axios'
import { FriendButton } from './friendButton'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { getUserPinInfo, selectActionBycategory } from '../../actions'
import ListOfPins from '../ListOfPins'
import PinClick from '../PinClick'
import { ComponentContainer, CategoryList } from '../elements'
import {
  OtherUserContainer,
  OtherUserContainerUp,
  ProfilePicUser,
  NameAndBioContainerUser,
  UserName,
  UserBio,
  OtherUserContainerFriendshipButton,
  OtherUserContainerDown,
  OtherUserContainerDownLeft,
  OtherUserContainerDownRight,
  MapContainer,
  Form,
  UsersPinsButton
} from './elements'
class OtherProfile extends React.Component {
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

    this.checkedCategory = this.checkedCategory.bind(this)
    this.pinClick = this.pinClick.bind(this)
    this.togglePinClick = this.togglePinClick.bind(this)
    this.showListComponent = this.showListComponent.bind(this)
    this.closeListComponent = this.closeListComponent.bind(this)
  }
  componentDidMount() {
    this.whatToDoOnLoad(this.props.match.params.id)
  }
  whatToDoOnLoad(id) {
    axios
      .get(`/getUser/${id}`)
      .then(response => {
        this.setState({ user: response.data.user })
      })
      .catch(err => {
        console.log(`error in getUser: ${err}`)
      })
    axios
      .get(`/getUserPins`, {
        params: { id: id }
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
  checkedCategory(e) {
    if (e.target.checked) {
      this.state.arrayOfCategory.push(e.target.value)
      document.querySelector(`label[for=${e.target.name}]`).style.color =
        '#b52519'
      document.querySelector(`label[for=${e.target.name}]`).style.fontWeight =
        '900'
    } else {
      this.state.arrayOfCategory = this.state.arrayOfCategory.filter(item => {
        return item !== e.target.value
      })
      document.querySelector(`label[for=${e.target.name}]`).style.color =
        'black'
      document.querySelector(`label[for=${e.target.name}]`).style.fontWeight =
        '400'
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
  categoryItems(color, text, variable, myFunction) {
    const style = {
      backgroundSize: 'contain'
    }
    let str = '/pins/' + color + 'Pin.png'
    return (
      <div className="categoryItem">
        <input
          style={style}
          type="checkbox"
          id={variable}
          name={variable}
          value={variable}
          className="check"
          onClick={myFunction}
        />
        <img
          src={str}
          className="categoryItemPinIcon"
          alt="categoryItemPinIcon"
        />
        <label htmlFor={variable} className="pinText">
          {text}
        </label>
      </div>
    )
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
    const userAvatar = this.state.user.profilepic || '/user.png'
    const profilePicStyle = {
      backgroundImage: `url(${userAvatar})`
    }
    return (
      <React.Fragment>
        {this.state.showListComponent && (
          <ListOfPins
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
        <ComponentContainer>
          <OtherUserContainer>
            <OtherUserContainerUp>
              <div className="inARow">
                <ProfilePicUser style={profilePicStyle} />
                <NameAndBioContainerUser>
                  <UserName>
                    {this.state.user.first} {this.state.user.last}
                  </UserName>
                  <UserBio>{this.state.user.bio}</UserBio>
                </NameAndBioContainerUser>
              </div>
              <OtherUserContainerFriendshipButton>
                <FriendButton otherId={this.props.match.params.id} />
              </OtherUserContainerFriendshipButton>
            </OtherUserContainerUp>
            <OtherUserContainerDown>
              <OtherUserContainerDownLeft>
                <CategoryList>
                  <Form>
                    {this.categoryItems(
                      'blue',
                      'Museums',
                      'museums',
                      this.checkedCategory
                    )}
                    {this.categoryItems(
                      'green',
                      'Parks',
                      'parks',
                      this.checkedCategory
                    )}
                    {this.categoryItems(
                      'yellow',
                      'Restaurants',
                      'restaurants',
                      this.checkedCategory
                    )}
                    {this.categoryItems(
                      'pink',
                      'Bars',
                      'bars',
                      this.checkedCategory
                    )}
                    {this.categoryItems(
                      'purple',
                      'Sightseeings',
                      'sightseeing',
                      this.checkedCategory
                    )}
                  </Form>
                  <UsersPinsButton onClick={this.showListComponent}>
                    {this.state.user.first}'s Pins
                  </UsersPinsButton>
                </CategoryList>
              </OtherUserContainerDownLeft>
              <OtherUserContainerDownRight>
                <MapContainer>
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
                </MapContainer>
              </OtherUserContainerDownRight>
            </OtherUserContainerDown>
          </OtherUserContainer>
        </ComponentContainer>
      </React.Fragment>
    )
  }
}
OtherProfile.propTypes = {
  id: PropTypes.number.isRequired,
  lat: PropTypes.number,
  lng: PropTypes.number
}

const mapStateToProps = function(state) {
  return {
    markersArray: state.markersArray
    // pins: state.onlineUsers
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAM59_tOly6RmV6eSBYguDKRMukEgQ20d4'
})(connect(mapStateToProps)(OtherProfile))
