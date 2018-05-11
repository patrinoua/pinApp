import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MapContainer from "./mapContainer"

const mapStateToProps = function(state) {
    return {
        onlineUsers: state.onlineUsers
    };
};
class MapApp extends React.Component {
    render() {
        return (
            <div>
                <h1> Welcome to map!</h1>
                <MapContainer />
            </div>
        )
    }
}

export default connect(mapStateToProps)(MapApp);
