import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "./axios";
import { deletePin } from "./actions";
class PinClick extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ready: null
        };
        this.deletePin = this.deletePin.bind(this);
    }
    componentDidMount() {
        axios
            .post("/PinClick", { pinId: this.props.pinId })
            .then((response) => {
                this.setState({
                    title: response.data.pinInfo.title,
                    category: response.data.pinInfo.category,
                    url: response.data.pinInfo.url,
                    description: response.data.pinInfo.description,
                    created_at: response.data.pinInfo.created_at,
                    userId: response.data.pinInfo.user_id,
                    ready: true
                });
                console.log(this.props.id, this.state.userId);
            })
            .catch((err) => {
                console.log(`error in PinClick componentDidMount: ${err}`);
            });
    }
    deletePin() {
        this.props.dispatch(deletePin(this.props.pinId));
    }
    render() {
        if (!this.state.ready) {
            return <img src="/monky.gif" />;
        }
        return (
            <React.Fragment>
                <div className="blackVail" onClick={this.toggle} />
                <div className="pinClickContainer">
                    <p id="exit" onClick={this.toggle}>
                        X
                    </p>
                    {/*<div className="fieldsContainer">
                    </div>*/}
                </div>

                <div id="clickPinHolder">
                    <div className="">
                        <h1>
                            <img src="/pins/bigPin.png" />
                            <span className=""> add pin</span>
                        </h1>
                    </div>
                    <div className="pinClickHolder">
                        <h1>{this.state.title}</h1>
                        <h3>{this.state.category}</h3>
                        {this.state.url && (
                            <div>
                                <img src={this.state.url} />
                            </div>
                        )}
                        {!this.state.url && (
                            <div>
                                <img src="/monky.gif" />
                            </div>
                        )}
                        <p>{this.state.description}</p>
                        <h6>{this.state.created_at}</h6>

                        <button onClick={this.props.togglePinClick}>
                            Close
                        </button>
                    </div>
                </div>
                {this.props.id == this.state.userId && (
                    <button onClick={this.deletePin}>Delete</button>
                )}
            </React.Fragment>
        );
    }
}
const mapStateToProps = function(state) {
    return {
        markersArray: state.markersArray
        // pins: state.onlineUsers
    };
};
export default connect(mapStateToProps)(PinClick);
