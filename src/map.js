import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MapContainer from "./mapContainer";
import { emit } from "./socket";
const mapStateToProps = function(state) {
    return {
        onlineUsers: state.onlineUsers
    };
};
class MapApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: null,
            lng: null
        };
        this.makeNewMarker = this.makeNewMarker.bind(this);
    }
    makeNewMarker(obj) {
        emit("makeNewMarker", obj);
    }
    render() {
        const style = {
            width: "60vw",
            height: "50vh",
            position: "absolute",
            top: "20vh",
            left: "5vh"
        };
        // if (!this.props.loaded) {
        //     return <div>Loading...</div>;
        // }

        return (
            <React.Fragment>
                <MapContainer
                    style={style}
                    makeNewMarker={this.makeNewMarker}
                />
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps)(MapApp);
