import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "./axios";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import AddNewPin from "./addNewPin";
import { getPinInfo, selectActionBycategory } from "./actions";
class MapContainerREDUX extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayOfCategory: [],
            showCategorySelect: false,
            copyOfPinsArray: [],
            addMyPinLocationVisible: false
        };
        // this.textInput = React.createRef();
        this.state.addNewPinIsVisible = false;
        this.mapClicked = this.mapClicked.bind(this);
        this.toggleAddNewPinComponent = this.toggleAddNewPinComponent.bind(
            this
        );
        this.selectBycategory = this.selectBycategory.bind(this);
        this.checkValue = this.checkValue.bind(this);
        this.toggleSelectCategory = this.toggleSelectCategory.bind(this);
        this.toggleAddMyPinLocationVisible = this.toggleAddMyPinLocationVisible.bind(
            this
        );
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
    mapClicked(mapProps, map, clickEvent) {
        this.toggleAddNewPinComponent();
        this.setState({
            lat: clickEvent.latLng.lat(),
            lng: clickEvent.latLng.lng()
        });
    }
    checkValue(e) {
        if (e.target.checked) {
            this.state.arrayOfCategory.push(e.target.value);
            console.log(this.state.arrayOfCategory);
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
            width: "60vw",
            height: "50vh",
            position: "absolute",
            top: "20%",
            left: "20%"

        };
        // if (!this.props.lat) {
        //     return <img src="/monky.gif" />;
        // }

        return (
            <React.Fragment>

                {/*<div className="chicken">*/}

                    <button onClick={this.toggleSelectCategory}>categories</button>
                    <button onClick={this.toggleAddMyPinLocationVisible}>
                        drop pin
                    </button>
                    {this.state.showCategorySelect && (
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
                    )}


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
                        <Marker
                            onClick={this.onMarkerClick}
                            name={"Current location"}
                        />

                        {this.props.markersArray &&
                            this.props.markersArray.map((item) => {
                                return (
                                    <Marker
                                        key={item.id}
                                        onClick={this.onMarkerClick}
                                        name={item.title}
                                        position={{
                                            lat: item.lat,
                                            lng: item.lng
                                        }}
                                        icon={{
                                            url: item.color,
                                            anchor: new google.maps.Point(0, 0),
                                            scaledSize: new google.maps.Size(25, 35)
                                        }}
                                    />
                                );
                            })}

                        {this.state.addNewPinIsVisible && (
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
                        )}
                    </Map>

                {/*</div>*/}

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
})(connect(mapStateToProps)(MapContainerREDUX));
