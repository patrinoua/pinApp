

import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { MapContainer } from "./MapContainer"



class MapApp extends React.Component {
    render() {
        return (
            <div className="mapAppComponent">

                <h1> Welcome to map!</h1>
                <MapContainer />
                <div className="mapArea">
                    <p>here is the map area...</p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        onlineUsers: state.onlineUsers
    };
};



export default connect(mapStateToProps)(MapApp);
