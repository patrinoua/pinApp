import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { getUserPins, selectActionBycategory } from '../../actions'
import PinClick from '../PinClick'
import AddNewPin from '../AddNewPin'
import ListOfPins from '../ListOfPins'

import {
  ContainerMap,
  MapContainerDown,
  PopUpShare,
  MapContainerLeft,
  MapContainerRight,
  CategoryList
} from '../elements'

class MapContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      arrayOfCategory: [],
      showCategorySelect: false,
      addMyPinLocationVisible: false,
      myLat: null,
      myLng: null,
      watchId: null,
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
      addNewPinIsVisible: false,
      clickedPinId: null,
      pinClickVisible: false,
      mapHasBinClicked: false,
      showListComponent: false,
      currentLocationPinIsVisible: true,
      showThePop: true
    }
    this.closeListComponent = this.closeListComponent.bind(this)
    this.showListComponent = this.showListComponent.bind(this)
    this.mapClicked = this.mapClicked.bind(this)
    this.toggleAddNewPinComponent = this.toggleAddNewPinComponent.bind(this)
    this.checkedCategory = this.checkedCategory.bind(this)
    this.watchMyLocation = this.watchMyLocation.bind(this)
    this.toggleAddMyPinLocationVisible = this.toggleAddMyPinLocationVisible.bind(
      this
    )
    this.pinClick = this.pinClick.bind(this)
    this.togglePinClick = this.togglePinClick.bind(this)
    this.mapHasBinClicked = this.mapHasBinClicked.bind(this)
    this.closePopPin = this.closePopPin.bind(this)
    this.handleSearchboxChange = this.handleSearchboxChange.bind(this)
    this.categoryItems = this.categoryItems.bind(this)
  }
  handleSearchboxChange(e) {
    this[e.target.name] = e.target.value
  }
  componentDidMount() {
    this.props.dispatch(getUserPins())
    // this.props.dispatch(getPinInfo());

    // navigator.geolocation.getCurrentPosition((position) => {
    //     this.setState({
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude
    //     });
    // });
  }
  closeListComponent(e) {
    this.setState({
      showListComponent: false
    })
  }
  pinClick(e) {
    this.clickedPinId = e.name
    this.setState({
      clickedPinId: e.name,
      pinClickVisible: !this.state.pinClickVisible,
      lat: e.position.lat,
      lng: e.position.lng
    })
  }
  togglePinClick() {
    this.setState({
      pinClickVisible: !this.state.pinClickVisible
    })
  }
  watchMyLocation() {
    if (!this.state.myLat) {
      let watchId = navigator.geolocation.watchPosition(pos => {
        // console.log(pos.coords.latitude)
        this.setState({
          myLat: pos.coords.latitude,
          myLng: pos.coords.longitude,
          watchId: watchId
        })
      }, error)
      function error(err) {
        console.log(`error in watchMyLocation: ${err.code} ${err.message}`)
      }
    } else {
      navigator.geolocation.clearWatch(this.state.watchId)
      this.setState({
        myLat: null,
        myLng: null,
        watchId: null
      })
    }
  }
  toggleAddMyPinLocationVisible() {
    this.setState({
      addMyPinLocationVisible: !this.state.addMyPinLocationVisible
    })
  }
  toggleAddNewPinComponent() {
    this.setState({
      addNewPinIsVisible: !this.state.addNewPinIsVisible
    })
  }
  mapHasBinClicked() {
    this.toggleAddNewPinComponent()
    this.setState({
      mapHasBinClicked: !this.state.mapHasBinClicked
    })
  }
  mapClicked(mapProps, map, clickEvent) {
    this.mapHasBinClicked()
    this.setState({
      lat: clickEvent.latLng.lat(),
      lng: clickEvent.latLng.lng()
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
        this.props.markersArray
      )
    )
  }
  showListComponent() {
    this.setState({
      showListComponent: true
    })
  }
  closePopPin() {
    this.setState({
      showSharedPin: false
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
    const style = {
      backgroundSize: 'contain'
    }
    return (
      <React.Fragment>
        {this.state.showListComponent && (
          <ListOfPins closeListComponent={this.closeListComponent} />
        )}
        {this.props.pinInfo &&
          this.state.showThePop && (
            <PopUpShare>
              <p>{this.props.userName}</p>
              <span>shared a cool pin with you</span>
              <button
                onClick={() => {
                  // sharedPin(this.props.pinInfo.id);
                  this.setState({
                    showSharedPin: true,
                    showThePop: false
                  })
                }}
              >
                view pin
              </button>
            </PopUpShare>
          )}
        {this.state.showSharedPin && (
          <PinClick
            pinId={this.props.pinInfo.id}
            togglePinClick={this.closePopPin}
            id={this.props.id}
          />
        )}
        {this.state.pinClickVisible &&
          this.state.clickedPinId && (
            <PinClick
              pinId={this.state.clickedPinId}
              togglePinClick={this.togglePinClick}
              id={this.props.id}
              lat={this.state.pinLat}
              lng={this.state.pinLng}
            />
          )}
        <ContainerMap>
          <MapContainerDown>
            <MapContainerLeft>
              <CategoryList>
                <form id="myForm">
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
                </form>
                <button
                  className="pinAppButton"
                  onClick={this.showListComponent}
                >
                  My pins
                </button>
              </CategoryList>
            </MapContainerLeft>
            <MapContainerRight>
              {/*<div className="mapContainerRightUP">
                  <div className="inARow">
                      <button
                          className="pinAppButton"
                          onClick={this.watchMyLocation}>
                          my location
                      </button>
                      <button
                          className="pinAppButton"
                          onClick={() => {
                              console.log("bbbbb");
                              this.forceUpdate();
                          }}
                      >
                          center map
                      </button>
                  </div>
                </div>*/}
              <div className="mapContainerRightDOWN">
                {/*<button
                    className="pinAppButton roundButton dropPinButton"
                    onClick={this.toggleAddNewPinComponent}
                >
                    Drop pin
                </button>*/}

                <div className="mapArea">
                  {!this.props.lat && (
                    <img src="assets/loading.gif" alt="loading" />
                  )}
                  {this.props.lat && (
                    <Map
                      style={style}
                      initialCenter={{
                        lat: this.state.lat || this.props.lat,
                        lng: this.state.lng || this.props.lng
                        // lat: 52.4918854,
                        // lng: 13.360088699999999
                      }}
                      zoom={14}
                      google={this.props.google}
                      onClick={this.mapClicked}
                      onDragend={e => {
                        this.setState({
                          currentLocationPinIsVisible: false
                        })
                      }}
                      onReady={this.fetchPlaces}
                      visible={true}
                    >
                      {this.state.myLat && (
                        <Marker
                          icon={{
                            url: '/assets/dot.png',
                            anchor: new google.maps.Point(-20, -20),
                            scaledSize: new google.maps.Size(20, 20)
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
                  )}
                  {this.props.lat && (
                    <div>
                      {/****** search box
                      <input
                        id="searchboxInputField"
                        name="searchbox"
                        placeholder="search"
                        onChange={this.handleSearchboxChange}
                        onKeyDown={e => {
                          if (e.keyCode === 13) {
                            var geocoder = new google.maps.Geocoder()
                            geocoder.geocode(
                              {
                                address: this.searchbox
                              },
                              (results, status) => {
                                if (status === google.maps.GeocoderStatus.OK) {
                                  this.setState({
                                    lat: results[0].geometry.location.lat(),
                                    lng: results[0].geometry.location.lng()
                                  })
                                }
                              }
                            )
                          }
                        }}
                      />
                       search box *******/}

                      {/*******center button
                      <div
                        className="centerMapButton"
                        onClick={() => {
                          navigator.geolocation.getCurrentPosition((position) => {
                              this.setState({
                                  lat: position.coords.latitude,
                                  lng: position.coords.longitude
                              });
                          });
                        }}
                      />
                    center button*******/}
                      {this.state.currentLocationPinIsVisible && (
                        <img
                          id="dropPinInCurrentLocationButton"
                          src="pins/bigPin.png"
                          alt="bigPin"
                          className="pinMyCurrentLocationPin"
                          onClick={() => {
                            this.forceUpdate()
                            this.setState({
                              currentLocationPinIsVisible: !this.state
                                .currentLocationPinIsVisible,
                              lat: this.props.lat,
                              lng: this.props.lng
                            })
                            this.toggleAddNewPinComponent()
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </MapContainerRight>
          </MapContainerDown>
        </ContainerMap>
        {this.state.addNewPinIsVisible && (
          <AddNewPin
            lat={this.state.lat}
            lng={this.state.lng}
            toggleAddNewPinComponent={this.toggleAddNewPinComponent}
            pinId={this.state.clickedPinId}
          />
        )}
        {this.state.addMyPinLocationVisible && (
          <AddNewPin
            lat={this.props.lat}
            lng={this.props.lng}
            toggleAddNewPinComponent={this.toggleAddNewPinComponent}
            pinId={this.state.clickedPinId}
          />
        )}
      </React.Fragment>
    )
  }
}
MapContainer.propTypes = {
  id: PropTypes.number.isRequired,
  first: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  lat: PropTypes.number,
  lng: PropTypes.number
}
const mapStateToProps = function(state) {
  return {
    markersArray: state.markersArray,
    pinInfo: state.pinInfo,
    userName: state.userName
  }
}

//if there is no internet the GoogleApiWrapper doesnt work
//so the component will run if we do this:
// export default connect(mapStateToProps)(MapContainer)

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAM59_tOly6RmV6eSBYguDKRMukEgQ20d4'
})(connect(mapStateToProps)(MapContainer))
