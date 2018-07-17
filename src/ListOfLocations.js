import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "./axios";
import PinClick from "./PinClick.js";
class ListOfLocations extends React.Component {
    constructor(props) {
        super(props);
        this.state = { clickedPinId: null };
        this.closeClickedPinList = this.closeClickedPinList.bind(this);
        this.getLatAndLang = this.getLatAndLang.bind(this);
    }
    componentWillUnmount() {
        this.setState({
            clickedPinId: null
        });
    }
    closeClickedPinList() {
        this.setState({
            clickedPinId: null
        });
    }
    getLatAndLang() {
        console.log('getting themmmm');
        // lat = {this.props.markersArray.filter(
        //     (pin)=>{
        //         if(pin.id==this.state.clickedPinId){
        //             console.log("pin.lat", pin.lat);
        //             return pin.lat
        //         }
        //     }
        // )}
        // lng = {this.props.markersArray.filter(
        //     (pin)=>{
        //         if(pin.id==this.state.clickedPinId){
        //             console.log("pin.lng", pin.lng);
        //             return pin.lng
        //         }
        //     }
        // )}
    }
    render() {
        console.log("this.props.first in list of locations", this.props.first);
        console.log('this.state',this.state);

        return (
            <React.Fragment>
                {this.state.clickedPinId && (
                    <PinClick
                        pinId={this.state.clickedPinId}
                        togglePinClick={this.closeClickedPinList}
                        id={this.props.id}
                        lat = {this.state.lat}
                        lng = {this.state.lng}
                    />
                )}
                <div className="listOfPinsContainer">
                    <div
                        className="blackVail"
                        onClick={this.props.closeListComponent}
                    />
                    <div className="listOfLocationsHolder">
                        <div id="listSmallHolder">
                            <p id="listClose" onClick={this.props.closeListComponent}>
                                X
                            </p>
                            <div className="pinAppStyle listTitle">
                            {this.props.first && this.props.first+'\'s Pins'}
                            {!this.props.first && 'my Pins'}

                            </div>
                            {this.props.markersArray &&
                                this.props.markersArray.map((item) => {
                                    return (
                                        <div className="eachPin" key={item.id}>
                                            <img
                                                src={item.color}
                                                className="thePinImg"
                                                onClick={() => {
                                                    this.setState({
                                                        clickedPinId: item.id,
                                                        lat: item.lat,
                                                        lng: item.lng
                                                    });
                                                    this.props.closeListComponent;
                                                }}
                                            />
                                            <span className="titleHolder"> {item.title} </span>
                                            <span className="descHolder"> {item.description} </span>
                                            <div className="dateHolder"> <span>{item.created_at}</span> </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        markersArray: state.markersArray
    };
};

export default connect(mapStateToProps)(ListOfLocations);
