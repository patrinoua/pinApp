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
            clickedPinId: 4,
            pinClickVisible: true,
            mapHasBinClicked: false
        };

        this.state.addNewPinIsVisible = false;
        this.mapClicked = this.mapClicked.bind(this);
        this.toggleAddNewPinComponent = this.toggleAddNewPinComponent.bind(
            this
        );
        this.selectBycategory = this.selectBycategory.bind(this);
        this.checkValue = this.checkValue.bind(this);
        this.toggleSelectCategory = this.toggleSelectCategory.bind(this);
        this.watchMyLocation = this.watchMyLocation.bind(this);
        this.toggleAddMyPinLocationVisible = this.toggleAddMyPinLocationVisible.bind(
            this
        );
        this.pinClick = this.pinClick.bind(this);
        this.togglePinClick = this.togglePinClick.bind(this);
        this.mapHasBinClicked = this.mapHasBinClicked.bind(this);
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
    pinClick(e) {
        console.log(e.name);
        this.clickedPinId = e.name;
        console.log(this.clickedPinId);
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
            this.state.watchId = navigator.geolocation.watchPosition((pos) => {
                this.setState({
                    myLat: pos.coords.latitude,
                    myLng: pos.coords.longitude
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
        this.setState({
            mapHasBinClicked: !this.state.mapHasBinClicked
        });
    }
    mapClicked(mapProps, map, clickEvent) {
        this.mapHasBinClicked();
        //   if (this.state.showingInfoWindow)
        // this.setState({
        //   activeMarker: null,
        //   showingInfoWindow: false
        // });
        this.setState({
            lat: clickEvent.latLng.lat(),
            lng: clickEvent.latLng.lng()
        });
    }
    checkValue(e) {
        if (e.target.checked) {
            this.state.arrayOfCategory.push(e.target.value);
        } else {
            let arr = this.state.arrayOfCategory.filter((item) => {
                return item != e.target.value;
            });

            this.setState({
                arrayOfCategory: arr
            });
        }
    }
    selectBycategory(e) {
        this.props.dispatch(
            selectActionBycategory(
                this.state.arrayOfCategory,
                this.state.copyOfPinsArray
            )
        );
        document.getElementById("myForm").reset();
        this.setState({
            arrayOfCategory: []
        });
    }
    render() {
        const style = {
            backgroundSize: "contain",
            backgroundColor: "pink",
            borderRadius: "20px"
        };
        console.log(
            "this.state.addNewPinIsVisible",
            this.state.addNewPinIsVisible
        );
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
                <p id="dropPinHeader">
                    just drop pin{" "}
                    <span id="HERE" onClick={this.toggleAddNewPinComponent}>
                        HERE
                    </span>{" "}
                    or click the map to drop
                </p>
                <NamesToShow />
                {this.state.pinClickVisible &&
                    this.state.clickedPinId && (
                        <PinClick
                            pinId={this.state.clickedPinId}
                            togglePinClick={this.togglePinClick}
                        />
                    )}
                <div className="mapContainer">
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
                            <button onClick={this.selectBycategory}>
                                Submit
                            </button>

                            <button onClick={this.watchMyLocation}>
                                show my location
                            </button>
                        </div>
                    </div>
                    <div className="mapContainerRight">
                        <div className="mapArea">
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
                                zoom={15}
                                onClick={this.mapClicked}
                                onReady={this.fetchPlaces}
                                visible={true}
                            >
                                {this.state.myLat && (
                                    <Marker
                                        icon={{
                                            url: "/dot.png",
                                            anchor: new google.maps.Point(0, 0),
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

                                {/*{this.state.addNewPinIsVisible && (
                                <AddNewPin
                                    lat={this.state.lat}
                                    lng={this.state.lng}
                                    toggleAddNewPinComponent={
                                        this.toggleAddNewPinComponent
                                    }
                                />
                            )}
                            {this.state.addMyPinLocationVisible && (
                                <AddNewPin
                                    lat={this.props.lat}
                                    lng={this.props.lng}
                                    toggleAddMyPinLocationVisible={
                                        this.toggleAddMyPinLocationVisible
                                    }
                                />
                            )}*/}
                            </Map>
                        </div>
                    </div>

                    {/*{this.state.showCategorySelect && (
                        <div className="catagoryHolder">
                            <form id="myForm">
                                <input
                                    type="checkbox"
                                    id="museums"
                                    name="museums"
                                    value="museums"
                                    className="check"
                                    onClick={this.checkValue}
                                />
                                <label htmlFor="museums">Museums</label>
                                <input
                                    type="checkbox"
                                    id="bars"
                                    name="bars"
                                    value="bars"
                                    className="check"
                                    onClick={this.checkValue}
                                />
                                <label htmlFor="bars">Bars</label>
                                <input
                                    type="checkbox"
                                    id="restaurants"
                                    name="restaurants"
                                    value="restaurants"
                                    className="check"
                                    onClick={this.checkValue}
                                />
                                <label htmlFor="restaurants">Restaurants</label>
                                <input
                                    type="checkbox"
                                    id="parks"
                                    name="parks"
                                    value="parks"
                                    className="check"
                                    onClick={this.checkValue}
                                />
                                <label htmlFor="parks">Parks</label>
                                <input
                                    type="checkbox"
                                    id="sightseeing"
                                    name="sightseeing"
                                    value="sightseeing"
                                    className="check"
                                    onClick={this.checkValue}
                                />
                                <label htmlFor="sightseeing">Sightseeing</label>
                            </form>
                            <button onClick={this.selectBycategory}>Submit</button>
                        </div>
                    )}*/}
                </div>
                {this.state.addNewPinIsVisible && (
                    <AddNewPin
                        lat={this.props.lat}
                        lng={this.props.lng}
                        toggleAddNewPinComponent={this.toggleAddNewPinComponent}
                    />
                )}
                {this.state.mapHasBinClicked && (
                    <AddNewPin
                        lat={this.state.lat}
                        lng={this.state.lng}
                        mapHasBinClicked={this.mapHasBinClicked}
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
