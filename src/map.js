import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MapContainer from "./mapContainer";

const mapStateToProps = function(state) {
    return {
        onlineUsers: state.onlineUsers
    };
};

class MapApp extends React.Component {
    render() {
        const style = {
            width: "60vw",
            height: "50vh",
            position: "absolute",
            top: "20vh",
            left: "5vh"
        };
        console.log("****************************");
        console.log("IN MAP");
        console.log("this.props:\n",this.props);
        console.log("\nthis.props.google:",this.props.google);
        console.log(" \nthis.state:", this.state);

        // if (!this.props.loaded) {
        //     return <div>Loading...</div>;
        // }

        return (
            <React.Fragment>
                <MapContainer style={style} />
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps)(MapApp);
