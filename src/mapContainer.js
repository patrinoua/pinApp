import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
// import { connect } from "react-redux";
class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: null,
            lng: null
        };
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
        // this.getLng = this.getLng.bind(this);
    }
    fetchPlaces(mapProps, map) {
        const { google } = mapProps;
        const service = new google.maps.places.PlacesService(map);
    }
    // componentDidUpdate(prevProps, prevState) {
    //     if (prevProps.google !== this.props.google) {
    //         this.loadMap();
    //     }
    // }
    onMarkerClick(props, marker, e) {
        console.log(props.position);
        // console.log(marker);
        // console.log(e);
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }
    onMapClicked(props) {
        console.log(props.position);
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    }
    mapClicked(mapProps, map, clickEvent) {
        // console.log(mapProps);
        // console.log(map);
        console.log(clickEvent.latLng.lat());
        console.log(clickEvent.latLng.lng());
    }
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude, position.coords.longitude);
            this.setState({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
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
        if (!this.state.lat) {
            return <h1>map not ready</h1>;
        }

class MapContainer extends React.Component {

                <InfoWindow>
                    <div>
                        <h1>InfoWindow</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}
const mapStateToProps = function(state) {
    return {
        pins: state.onlineUsers
    };
};

// export default connect(mapStateToProps)

export default connect(
    GoogleApiWrapper({
        apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
    }),
    mapStateToProps
)(MapContainer);

export class Map extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
    }
    componentDidMount() {
        this.loadMap();
    }
    loadMap() {
        if (this.props && this.props.google) {
            // google is available
            const { google } = this.props;
            const maps = google.maps;
        }
    }
    render() {
        return <div ref="map">Loading map...</div>;
    }
}
