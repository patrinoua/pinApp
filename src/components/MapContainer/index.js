import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { getUserPins, selectActionBycategory, deletePin } from '../../actions'
import PinClick from '../PinClick'
import { DeletePinAlert } from '../PinClick/ButtonsAndAlerts'
import EditPin from '../EditPin'
import AddNewPin from '../AddNewPin'
import ListOfPins from '../ListOfPins'
import Category from './Category'

import {
	ContainerMap,
	MapContainerDown,
	PopUpShare,
	MapContainerLeft,
	MapContainerRight,
	CategoryList,
} from '../elements'
import { MapArea } from './elements'

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
			deleteAlertIsVisible: false,
			showThePop: true,
			currentPinInfo: [],
		}
		this.closeListComponent = this.closeListComponent.bind(this)
		this.showListComponent = this.showListComponent.bind(this)
		this.mapClicked = this.mapClicked.bind(this)
		this.toggleAddNewPinComponent = this.toggleAddNewPinComponent.bind(this)
		this.checkCategory = this.checkCategory.bind(this)
		this.watchMyLocation = this.watchMyLocation.bind(this)
		this.toggleAddMyPinLocationVisible =
			this.toggleAddMyPinLocationVisible.bind(this)

		this.pinClick = this.pinClick.bind(this)
		this.togglePinClick = this.togglePinClick.bind(this)
		this.toggleEditMode = this.toggleEditMode.bind(this)
		this.toggleDeleteAlert = this.toggleDeleteAlert.bind(this)
		this.deletePin = this.deletePin.bind(this)

		this.mapHasBinClicked = this.mapHasBinClicked.bind(this)
		this.closePopPin = this.closePopPin.bind(this)
		this.handleSearchboxChange = this.handleSearchboxChange.bind(this)
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
			showListComponent: false,
		})
	}
	pinClick(e) {
		this.clickedPinId = e.name
		this.setState({
			clickedPinId: e.name,
			pinClickVisible: !this.state.pinClickVisible,
			lat: e.position.lat,
			lng: e.position.lng,
		})
	}
	togglePinClick() {
		this.setState({
			pinClickVisible: !this.state.pinClickVisible,
		})
	}
	toggleEditMode(currentPinInfo) {
		this.setState({
			editMode: !this.state.editMode,
			currentPinInfo,
		})
	}
	toggleDeleteAlert() {
		this.setState({
			deleteAlertIsVisible: !this.state.deleteAlertIsVisible,
		})
	}
	deletePin(pinId) {
		this.props.dispatch(deletePin(pinId))
		this.toggleDeleteAlert()
		this.togglePinClick()
		this.toggleEditMode()
	}
	watchMyLocation() {
		if (!this.state.myLat) {
			let watchId = navigator.geolocation.watchPosition((pos) => {
				// console.log(pos.coords.latitude)
				this.setState({
					myLat: pos.coords.latitude,
					myLng: pos.coords.longitude,
					watchId: watchId,
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
				watchId: null,
			})
		}
	}
	toggleAddMyPinLocationVisible() {
		this.setState({
			addMyPinLocationVisible: !this.state.addMyPinLocationVisible,
		})
	}
	toggleAddNewPinComponent() {
		this.setState({
			addNewPinIsVisible: !this.state.addNewPinIsVisible,
		})
	}
	mapHasBinClicked() {
		this.toggleAddNewPinComponent()
		this.setState({
			mapHasBinClicked: !this.state.mapHasBinClicked,
		})
	}
	mapClicked(mapProps, map, clickEvent) {
		this.mapHasBinClicked()
		this.setState({
			lat: clickEvent.latLng.lat(),
			lng: clickEvent.latLng.lng(),
		})
	}
	checkCategory(e) {
		if (e.target.checked) {
			this.state.arrayOfCategory.push(e.target.value)
			document.querySelector(`label[for=${e.target.name}]`).style.color =
				'#b52519'
			document.querySelector(`label[for=${e.target.name}]`).style.fontWeight =
				'900'
		} else {
			this.state.arrayOfCategory = this.state.arrayOfCategory.filter((item) => {
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
			showListComponent: true,
		})
	}
	closePopPin() {
		this.setState({
			showSharedPin: false,
		})
	}

	render() {
		const style = {
			backgroundSize: 'contain',
		}
		const { editMode, deleteAlertIsVisible } = this.state
		const { markersArray, filteredByCategory } = this.props
		const markersToDisplay = filteredByCategory || markersArray
		return (
			<React.Fragment>
				{this.state.showListComponent && (
					<ListOfPins closeListComponent={this.closeListComponent} />
				)}

				{this.props.pinInfo && this.state.showThePop && (
					<PopUpShare>
						<p>{this.props.userName}</p>
						<span>shared a cool pin with you</span>
						<button
							onClick={() => {
								// sharedPin(this.props.pinInfo.id);
								this.setState({
									showSharedPin: true,
									showThePop: false,
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
				{this.state.pinClickVisible && this.state.clickedPinId && (
					<PinClick
						pinId={this.state.clickedPinId}
						togglePinClick={this.togglePinClick}
						toggleEditMode={this.toggleEditMode}
						id={this.props.id}
						lat={this.state.pinLat}
						lng={this.state.pinLng}
					/>
				)}
				{editMode && (
					<EditPin
						toggleEditMode={this.toggleEditMode}
						togglePinClick={this.togglePinClick}
						pinId={this.state.clickedPinId}
						currentPinInfo={this.state.currentPinInfo[0]}
						toggleDeleteAlert={this.toggleDeleteAlert}
					/>
				)}

				{deleteAlertIsVisible && (
					<DeletePinAlert
						deletePin={() => this.deletePin(this.state.clickedPinId)}
						toggleDeleteAlert={this.toggleDeleteAlert}
					/>
				)}

				<ContainerMap>
					<MapContainerDown>
						<MapContainerLeft>
							<CategoryList>
								<form id='myForm'>
									<Category
										color='blue'
										category='museums'
										checkCategory={this.checkCategory}
									/>
									<Category
										color='green'
										category='parks'
										checkCategory={this.checkCategory}
									/>
									<Category
										color='yellow'
										category='restaurants'
										checkCategory={this.checkCategory}
									/>
									<Category
										color='pink'
										category='bars'
										checkCategory={this.checkCategory}
									/>
									<Category
										color='purple'
										category='sightseeing'
										checkCategory={this.checkCategory}
									/>
								</form>
								<button
									className='pinAppButton'
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
							<div className='mapContainerRightDOWN'>
								<MapArea>
									{console.log('hey!!!', this.props.lat)}
									{!this.props.lat && (
										<img src='assets/loading.gif' alt='loading' />
									)}
									{this.props.lat && (
										<Map
											style={style}
											initialCenter={{
												lat: this.state.lat || this.props.lat,
												lng: this.state.lng || this.props.lng,
												// lat: 52.4918854,
												// lng: 13.360088699999999
											}}
											zoom={14}
											google={this.props.google}
											onClick={this.mapClicked}
											onDragend={(e) => {
												this.setState({
													currentLocationPinIsVisible: false,
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
														scaledSize: new google.maps.Size(20, 20),
													}}
												/>
											)}
											{markersToDisplay &&
												markersToDisplay.map((item) => {
													return (
														<Marker
															key={item.id}
															onClick={this.pinClick}
															name={item.id}
															position={{
																lat: item.lat,
																lng: item.lng,
															}}
															icon={{
																url: item.color,
																anchor: new google.maps.Point(15, 35),
																scaledSize: new google.maps.Size(25, 35),
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
													id='dropPinInCurrentLocationButton'
													src='pins/bigPin.png'
													alt='bigPin'
													className='pinMyCurrentLocationPin'
													onClick={() => {
														this.forceUpdate()
														this.setState({
															currentLocationPinIsVisible:
																!this.state.currentLocationPinIsVisible,
															lat: this.props.lat,
															lng: this.props.lng,
														})
														this.toggleAddNewPinComponent()
													}}
												/>
											)}
										</div>
									)}
								</MapArea>
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
	lng: PropTypes.number,
}
const mapStateToProps = function (state) {
	return {
		markersArray: state.markersArray,
		filteredByCategory: state.filteredByCategory,
		pinInfo: state.pinInfo,
		userName: state.userName,
	}
}

//if there is no internet the GoogleApiWrapper doesnt work
//so the component will run if we do this:
// export default connect(mapStateToProps)(MapContainer)

export default GoogleApiWrapper({
	apiKey: 'AIzaSyAM59_tOly6RmV6eSBYguDKRMukEgQ20d4',
})(connect(mapStateToProps)(MapContainer))
