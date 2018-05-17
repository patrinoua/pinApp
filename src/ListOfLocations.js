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
                        <div className="eachPin" id="titleOfTheLocation">
                            <span />
                            <span>Title</span>
                            <span>Category</span>
                            <span>Description</span>
                            <span>Time & Date</span>
                        </div>
                        {this.props.markersArray &&
                            this.props.markersArray.map((item) => {
                                return (
                                    <div className="eachPin" key={item.id}>
                                        {/* <div className="listImgHolder">
                                            <img
                                                src={item.url || "/user.png"}
                                            />
                                        </div> */}
                                        <div className="flexHolder">
                                            <img
                                                src={item.color}
                                                className="thePinImg"
                                            />
                                        </div>
                                        <div className="flexHolder">
                                            <h2>{item.title}</h2>
                                        </div>
                                        <div className="flexHolder">
                                            <h3>{item.category}</h3>
                                        </div>
                                        <span className="descHolder">
                                            <p>{item.description}</p>
                                        </span>
                                        <div className="flexHolder">
                                            <span>{item.created_at}</span>
                                        </div>
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
