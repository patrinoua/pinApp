import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import axios from "./axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Logo, Login } from "./welcome";
import { FriendButton } from "./friendButton";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { getPinInfo, getUserPinInfo, selectActionBycategory } from "./actions";

import PinClick from "./PinClick.js";


export class OtherProfilePage extends React.Component {
    constructor(props) {
        super(props);
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
        };

        this.selectBycategory = this.selectBycategory.bind(this);
        this.checkValue = this.checkValue.bind(this);
        this.pinClick = this.pinClick.bind(this);
        this.togglePinClick = this.togglePinClick.bind(this);
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
    checkValue(e) {
        if (e.target.checked) {
            this.state.arrayOfCategory.push(e.target.value);
            console.log(
                "this.state.arrayOfCategory",
                this.state.arrayOfCategory
            );
        } else {
            let arr = this.state.arrayOfCategory.filter((item) => {
                return item != e.target.value;
            });

            this.setState({
                arrayOfCategory: arr
            });
            console.log("e.target.checked", e.target.checked);
            console.log(
                "this.state.arrayOfCategory",
                this.state.arrayOfCategory
            );
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
    componentDidMount() {
        // console.log("this.props.match.params.id!!!!",this.props.match.params.id);
        // console.log('loggint routerProps',this.props.routerProps.match.params.id);
        axios
            .get(`/getUser/${this.props.match.params.id}`)
            .then((response) => {
                if (response.data) {
                    this.setState(response.data.user);
                    this.props.dispatch(getUserPinInfo(response.data.user.id));
                } else {
                    console.log(
                        "response.data in getUser had an error ",
                        response.data
                    );
                }
            })
            .catch((err) => {
                console.log("oh no!!!",err);
            });
            // axios
            //     .get("/getMarker")
            //     //pass the id
            //     //use the same function that is used on the server
            //     .then((response) => {
            //         console.log('response...',response.data.marker);
            //         this.setState({
            //             copyOfPinsArray: response.data.marker
            //         });
            //     })
            //     .catch((err) => {
            //         console.log(`error in pic getPinInfo: ${err}`);
            //     });
            // this.props.dispatch(getUserPinInfo());

            // navigator.geolocation.getCurrentPosition((position) => {
            //     this.setState({
            //         lat: position.coords.latitude,
            //         lng: position.coords.longitude
            //     });
            // });
    }

    render() {
        console.log("otherProfilePage - props : ", this.props);
        // console.log("otherProfilePage - STATE (the user's page we're visiting) : ", this.state);
        let pic = this.state.profilepic;
        if (!pic) {
            pic = "/neo.png";
        }
        const style = {
            backgroundSize: "contain",
            backgroundColor: "pink",
            borderRadius: "20px"
        };
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
            <div className="profileContainerUser">

                <div className="infoContainerUser">

                    <div className="profilePicUser">
                        <img src={pic} />{" "}
                    </div>
                    <div className="nameAndBioContainerUser">
                        <div className="nameUser">
                            {this.state.first} {this.state.last}
                        </div>
                        <div className="bioUser">
                             {this.state.bio}
                        </div>
                    </div>
                    <div className="centerStuff">
                        <FriendButton otherId={this.props.match.params.id} />
                        <button> Send Msg</button>
                    </div>
                </div>

                <div className="mapContainerUser">
                    <div className="mapContainerUserLeft">
                        <div className="categoryListUser">
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
                            {/*<button onClick={this.toggleSelectCategory}>categories</button>
                            <button onClick={this.watchMyLocation}>show my location</button>
                            <button onClick={this.toggleAddMyPinLocationVisible}>
                                drop pin
                            </button>*/}
                        </div>
                    </div>
                    <div className="mapContainerUserRight">
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
                {/*<div className="mapBlockUser">
                    <div className="menuuuu">
                        <div className="menuuuuObj">1</div>
                        <div className="menuuuuObj">2</div>
                        <div className="menuuuuObj">3</div>

                    </div>

                    <div className="mapAreaUser">

                    </div>
                </div>*/}

            </div>
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
})(connect(mapStateToProps)(OtherProfilePage));
