import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "./axios";
class ListOfLocations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <React.Fragment>
                <p id="listClose" onClick={this.props.closeListCom}>
                    X
                </p>
                <div id="ListOfLocationsHolder">
                    <div id="listSmallHolder">
                        {this.props.markersArray &&
                            this.props.markersArray.map((item) => {
                                return (
                                    <div className="eachPin" key={item.id}>
                                        {/* <div className="listImgHolder">
                                            <img
                                                src={item.url || "/user.png"}
                                            />
                                        </div> */}
                                        <img
                                            src={item.color}
                                            className="thePinImg"
                                        />
                                        <h2>{item.title}</h2>
                                        <h3>{item.category}</h3>
                                        <span className="descHolder">
                                            <p>{item.description}</p>
                                        </span>
                                        <span>{item.created_at}</span>
                                    </div>
                                );
                            })}
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
