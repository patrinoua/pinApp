import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "./axios";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
// import { connect } from "react-redux";
class MapContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: null,
            lng: null,
            showMarkerInput: null,
            markerToShow: [],
            arrayOfCatagory: []
        };

        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.mapClicked = this.mapClicked.bind(this);
        this.upload = this.upload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setFile = this.setFile.bind(this);
        this.checkValue = this.checkValue.bind(this);
        this.sendCatagory = this.sendCatagory.bind(this);
        // this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    }
    fetchPlaces(mapProps, map) {
        const { google } = mapProps;
        const service = new google.maps.places.PlacesService(map);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
    }
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
    // onMapClicked(props) {
    //     console.log(props.position);
    //
    //     if (this.state.showingInfoWindow) {
    //         this.setState({
    //             showingInfoWindow: false,
    //             activeMarker: null
    //         });
    //     }
    // }
    mapClicked(mapProps, map, clickEvent) {
        this.setState({
            showMarkerInput: true,
            lat: clickEvent.latLng.lat(),
            lng: clickEvent.latLng.lng()
        });
    }
    componentDidMount() {
        axios
            .get("/getMarker")
            .then((response) => {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.setState({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        markerToShow: [...response.data.marker]
                    });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    setFile(e) {
        // this[e.target.name] = e.target.files[0];
        this.setState({
            file: e.target.files[0]
        });
        // file = e.target.files[0];
        // this.setState({
        //     file: e.target.files[0]
        // });
    }

    checkValue(e) {
        this.catagory = e.target.value;
        this[e.target.name] = e.target.value;

        this.state.arrayOfCatagory.push(e.target.value);
    }
    sendCatagory(e) {
        axios
            .post("/categorySelect", { marker: this.state.arrayOfCatagory })
            .then((response) => {
                document.getElementById("myForm").reset();
                this.setState({
                    markerToShow: response.data.marker,
                    arrayOfCatagory: []
                });
            })
            .catch((err) => {
                console.log(`error in categorySelect: ${err}`);
            });
    }
    upload(e) {
        let obj = {
            description: this.description,
            title: this.title,
            catagory: this.catagory,
            lat: this.state.lat,
            lng: this.state.lng
        };
        axios
            .post("/markerInfo", obj)
            .then((response) => {
                const formData = new FormData();
                let old = response.data;
                formData.append("file", this.state.file);
                axios
                    .post("/uploadMarkerPic", formData)
                    .then((resp) => {
                        let arr = [];
                        old.marker.url = resp.data.url;
                        arr.push(old.marker);
                        let arr2 = this.state.markerToShow.concat(arr);
                        this.setState({
                            markerToShow: [...arr2],
                            showMarkerInput: null
                        });
                    })
                    .catch((err) => {
                        console.log(`error in pic upload: ${err}`);
                    });
            })
            .catch(function(err) {
                console.log("there was an error in upload", err);
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

        return (
            <React.Fragment>
                <div className="catagoryHolder">
                    <form id="myForm">
                        <input
                            type="checkbox"
                            id="museums"
                            name="museums"
                            value="museums"
                            onClick={this.checkValue}
                        />
                        <label htmlFor="museums">Museums</label>
                        <input
                            type="checkbox"
                            id="bars"
                            name="bars"
                            value="bars"
                            onClick={this.checkValue}
                        />
                        <label htmlFor="bars">Bars</label>
                        <input
                            type="checkbox"
                            id="restaurants"
                            name="restaurants"
                            value="restaurants"
                            onClick={this.checkValue}
                        />
                        <label htmlFor="restaurants">Restaurants</label>
                        <input
                            type="checkbox"
                            id="parks"
                            name="parks"
                            value="parks"
                            onClick={this.checkValue}
                        />
                        <label htmlFor="parks">Parks</label>
                        <input
                            type="checkbox"
                            id="sightseeing"
                            name="sightseeing"
                            value="sightseeing"
                            onClick={this.checkValue}
                        />
                        <label htmlFor="sightseeing">Sightseeing</label>
                    </form>
                    <button onClick={this.sendCatagory}>Submit</button>
                </div>
                <Map
                    style={style}
                    initialCenter={{
                        lat: this.state.lat,
                        lng: this.state.lng
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
                    {this.state.markerToShow &&
                        this.state.markerToShow.map((item) => {
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
                                        scaledSize: new google.maps.Size(30, 30)
                                    }}
                                />
                            );
                        })}

                    <InfoWindow onClose={this.onInfoWindowClose}>
                        <div>
                            <h1>InfoWindow</h1>
                        </div>
                    </InfoWindow>
                </Map>
                {this.state.showMarkerInput && (
                    <div className="markerInput">
                        <input
                            placeholder="title"
                            name="title"
                            onChange={this.handleChange}
                        />
                        <input
                            placeholder="description"
                            name="description"
                            onChange={this.handleChange}
                        />
                        <div className="fileUp">
                            <input
                                id="inputfile"
                                className="inputfile"
                                type="file"
                                name="file"
                                onChange={this.setFile}
                                data-multiple-caption="{count} files selected"
                                multiple
                            />
                            <label htmlFor="inputfile">Your Own Pic</label>
                            <form>
                                <div>
                                    <input
                                        type="checkbox"
                                        id="museums"
                                        name="museums"
                                        value="museums"
                                        onClick={this.checkValue}
                                    />
                                    <label htmlFor="museums">Museums</label>
                                    <input
                                        type="checkbox"
                                        id="bars"
                                        name="bars"
                                        value="bars"
                                        onClick={this.checkValue}
                                    />
                                    <label htmlFor="bars">Bars</label>
                                    <input
                                        type="checkbox"
                                        id="restaurants"
                                        name="restaurants"
                                        value="restaurants"
                                        onClick={this.checkValue}
                                    />
                                    <label htmlFor="restaurants">
                                        Restaurants
                                    </label>
                                    <input
                                        type="checkbox"
                                        id="parks"
                                        name="parks"
                                        value="parks"
                                        onClick={this.checkValue}
                                    />
                                    <label htmlFor="parks">Parks</label>
                                    <input
                                        type="checkbox"
                                        id="sightseeing"
                                        name="sightseeing"
                                        value="sightseeing"
                                        onClick={this.checkValue}
                                    />
                                    <label htmlFor="sightseeing">
                                        Sightseeing
                                    </label>
                                </div>
                            </form>
                            <button onClick={this.upload}>Submit</button>
                        </div>
                    </div>
                )}
            </React.Fragment>
        );
    }
}
const mapStateToProps = function(state) {
    return {
        pins: state.onlineUsers
    };
};
// const wrapper = GoogleApiWrapper((props) => ({
//     apiKey: props.apiKey,
//     language: props.language
// }));
// console.log("this is the wrapper", wrapper);
// export default wrapper(connect(mapStateToProps))(MapContainer);
// export default connect(mapStateToProps)(MapContainer);
export default GoogleApiWrapper({
    apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
})(connect(mapStateToProps)(MapContainer));
// export default GoogleApiWrapper({
//     apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
// })(MapContainer);
