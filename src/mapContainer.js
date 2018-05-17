import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "./axios";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import AddNewPin from "./addNewPin";
import { getPinInfo, selectActionBycategory } from "./actions";
import PinClick from "./PinClick.js";
import { NamesToShow } from "./NamesToShow";
import ListOfLocations from "./ListOfLocations.js";
class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayOfCategory: [],
            showCategorySelect: false,
            copyOfPinsArray: [],
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
            showListComponent: false
        };

        this.closeListCom = this.closeListCom.bind(this);
        this.showListComponent = this.showListComponent.bind(this);
        this.mapClicked = this.mapClicked.bind(this);
        this.toggleAddNewPinComponent = this.toggleAddNewPinComponent.bind(
            this
        );
        this.checkValue = this.checkValue.bind(this);
        this.toggleSelectCategory = this.toggleSelectCategory.bind(this);
        this.watchMyLocation = this.watchMyLocation.bind(this);
        this.toggleAddMyPinLocationVisible = this.toggleAddMyPinLocationVisible.bind(
            this
        );
        this.pinClick = this.pinClick.bind(this);
        this.togglePinClick = this.togglePinClick.bind(this);
        this.mapHasBinClicked = this.mapHasBinClicked.bind(this);
        this.closeAddNewPinComponent = this.closeAddNewPinComponent.bind(this);
    }

    componentDidMount() {
        axios
            .get("/getMarker")
            .then((response) => {
                this.setState({
                    copyOfPinsArray: response.data.marker
                });
            })
            .catch((err) => {
                console.log(`error in pic getPinInfo: ${err}`);
            });
        this.props.dispatch(getPinInfo());

        // navigator.geolocation.getCurrentPosition((position) => {
        //     this.setState({
        //         lat: position.coords.latitude,
        //         lng: position.coords.longitude
        //     });
        // });
    }
    closeListCom(e) {
        this.setState({
            showListComponent: false
        });
    }
    pinClick(e) {
        this.clickedPinId = e.name;

        this.setState({
            clickedPinId: e.name,
            pinClickVisible: !this.state.pinClickVisible
        });
    }
    togglePinClick() {
        this.setState({
            pinClickVisible: !this.state.pinClickVisible
        });
    }
    watchMyLocation() {
        if (!this.state.myLat) {
            let watchId = navigator.geolocation.watchPosition((pos) => {
                console.log(pos.coords.latitude);
                this.setState({
                    myLat: pos.coords.latitude,
                    myLng: pos.coords.longitude,
                    watchId: watchId
                });
            }, error);

            function error(err) {
                console.log(
                    `error in watchMyLocation: ${err.code} ${err.message}`
                );
            }
        } else {
            navigator.geolocation.clearWatch(this.state.watchId);
            this.setState({
                myLat: null,
                myLng: null,
                watchId: null
            });
        }
    }
    closeAddNewPinComponent() {
        this.setState({
            addNewPinIsVisible: false
        });
    }
    toggleAddMyPinLocationVisible() {
        this.setState({
            addMyPinLocationVisible: !this.state.addMyPinLocationVisible
        });
    }
    toggleAddNewPinComponent() {
        this.setState({
            addNewPinIsVisible: !this.state.addNewPinIsVisible
        });
    }
    toggleSelectCategory() {
        this.setState({
            showCategorySelect: !this.state.showCategorySelect
        });
    }
    mapHasBinClicked() {
        this.toggleAddNewPinComponent();
        this.setState({
            mapHasBinClicked: !this.state.mapHasBinClicked
        });
    }
    mapClicked(mapProps, map, clickEvent) {
        this.mapHasBinClicked();

        this.setState({
            lat: clickEvent.latLng.lat(),
            lng: clickEvent.latLng.lng()
        });
    }
    checkValue(e) {
        if (e.target.checked) {
            this.state.arrayOfCategory.push(e.target.value);
        } else {
            this.state.arrayOfCategory = this.state.arrayOfCategory.filter(
                (item) => {
                    return item != e.target.value;
                }
            );
        }

        this.props.dispatch(
            selectActionBycategory(
                this.state.arrayOfCategory,
                this.state.copyOfPinsArray
            )
        );
    }
    showListComponent() {
        this.setState({
            showListComponent: true
        });
    }
    render() {
        const style = {
            backgroundSize: "contain"
        };
        // if (!this.props.lat) {
        //     return <img src="/monky.gif" />;
        // }
        const categoryItems = function(color, text, variable, myFunction) {
            let str = "/pins/" + color + "Pin.png";
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
                    <img src={str} className="categoryItemPinIcon" />
                    <label htmlFor="museums"> {text} </label>
                </div>
            );
        };
        return (
            <React.Fragment>
                {this.state.showListComponent && (
                    <ListOfLocations closeListCom={this.closeListCom} />
                )}
                {this.state.pinClickVisible &&
                    this.state.clickedPinId && (
                        <PinClick
                            pinId={this.state.clickedPinId}
                            togglePinClick={this.togglePinClick}
                            id={this.props.id}
                        />
                    )}
                <div className="mapContainer">
                    <div className="mapContainerUp">
                        <p>
                            Click{" "}
                            <span
                                id="HERE"
                                onClick={this.toggleAddNewPinComponent}
                            >
                                HERE
                            </span>{" "}
                            to drop the pin on your current location or click on
                            a position on the map
                        </p>
                    </div>
                    <div className="mapContainerDown">
                        <div className="mapContainerLeft">
                            <div className="categoryList">
                                <form id="myForm">
                                    {categoryItems(
                                        "blue",
                                        "museums",
                                        "museums",
                                        this.checkValue
                                    )}
                                    {categoryItems(
                                        "green",
                                        "Parks",
                                        "parks",
                                        this.checkValue
                                    )}
                                    {categoryItems(
                                        "yellow",
                                        "restaurants",
                                        "restaurants",
                                        this.checkValue
                                    )}
                                    {categoryItems(
                                        "pink",
                                        "bars",
                                        "bars",
                                        this.checkValue
                                    )}
                                    {categoryItems(
                                        "purple",
                                        "sightseeing",
                                        "sightseeing",
                                        this.checkValue
                                    )}
                                </form>

                                <button onClick={this.watchMyLocation}>
                                    show my location
                                </button>
                                <button onClick={this.showListComponent}>
                                    list my locations
                                </button>
                                <button
                                    onClick={() => {
                                        console.log("bbbbb");
                                        this.forceUpdate();
                                    }}
                                >
                                    center
                                </button>
                            </div>
                        </div>
                        <div className="mapContainerRight">
                            <div className="mapArea">
                                <Map
                                    style={style}
                                    // initialCenter={{
                                    //     lat: this.props.lat,
                                    //     lng: this.props.lng
                                    //     // lat: 52.4918854,
                                    //     // lng: 13.360088699999999
                                    // }}
                                    center={{
                                        lat: this.props.lat,
                                        lng: this.props.lng
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
                                                url: "/dot.png",
                                                anchor: new google.maps.Point(
                                                    0,
                                                    0
                                                ),
                                                scaledSize: new google.maps.Size(
                                                    10,
                                                    10
                                                )
                                            }}
                                        />
                                    )}
                                    {this.props.markersArray &&
                                        this.props.markersArray.map((item) => {
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
                                                        anchor: new google.maps.Point(
                                                            0,
                                                            0
                                                        ),
                                                        scaledSize: new google.maps.Size(
                                                            25,
                                                            35
                                                        )
                                                    }}
                                                />
                                            );
                                        })}
                                </Map>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.addNewPinIsVisible && (
                    <AddNewPin
                        lat={this.state.lat}
                        lng={this.state.lng}
                        closeAddNewPinComponent={this.closeAddNewPinComponent}
                        pinId={this.state.clickedPinId}
                    />
                )}
                {this.state.addMyPinLocationVisible && (
                    <AddNewPin
                        lat={this.props.lat}
                        lng={this.props.lng}
                        closeAddNewPinComponent={this.closeAddNewPinComponent}
                        pinId={this.state.clickedPinId}
                    />
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        markersArray: state.markersArray
        // pins: state.onlineUsers
    };
};

export default GoogleApiWrapper({
    apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
})(connect(mapStateToProps)(MapContainer));
