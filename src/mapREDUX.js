import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "./axios";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import AddNewPin from "./addNewPin";
import { getPinInfo } from "./actions";
class MapContainerREDUX extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            lat: null,
            lng: null

        };
        this.state.addNewPinIsVisible = false
        this.mapClicked = this.mapClicked.bind(this);
        this.toggleAddNewPinComponent = this.toggleAddNewPinComponent.bind(this);
    }

    componentDidMount(){
        this.props.dispatch(getPinInfo())
        // navigator.geolocation.getCurrentPosition((position) => {
        //     this.setState({
        //         lat: position.coords.latitude,
        //         lng: position.coords.longitude
        //     });
        // });
    }
    toggleAddNewPinComponent(){
        console.log('toggling add new pin component....addNewPinIsVisible',this.state.addNewPinIsVisible);
        this.setState({
            addNewPinIsVisible:!this.state.addNewPinIsVisible
        })
    }
    mapClicked(mapProps, map, clickEvent) {
        this.toggleAddNewPinComponent();
        this.setState({
            lat: clickEvent.latLng.lat(),
            lng: clickEvent.latLng.lng()
        });
    }

    render() {
        const style = {
            width: "60vw",
            height: "50vh",
            position: "absolute",
            top: "20vh",
            left: "5vh"
        };
        if (!this.props.lat) {
            return <img src="/monky.gif"/>;
        }
        return(
            <React.Fragment>
                <Map
                    style={style}
                    initialCenter={{
                        lat: this.props.lat,
                        lng: this.props.lng
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
                                        anchor: new google.maps.Point(10, 10),
                                        scaledSize: new google.maps.Size(25, 35)
                                    }}
                                />
                            );
                        })
                    }

                    {this.state.addNewPinIsVisible&&(<AddNewPin lat={this.state.lat}
                                lng={this.state.lng}
                    />)}

                </Map>
            </React.Fragment>
        )
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
