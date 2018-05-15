import React from "react";
import ReactDOM from "react-dom";
import axios from "./axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { insertPinInfo } from "./actions";

const mapStateToProps = function(state) {
    return {
        onlineUsers: state.onlineUsers
    };
};

class AddNewPin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: null,
            lng: null,
            holder: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.setFile = this.setFile.bind(this);
        this.checkValue = this.checkValue.bind(this);
        this.insertPinInfo = this.insertPinInfo.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount() {
        console.log("add new pin.. is visible!, this.props", this.props);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    setFile(e) {
        // this[e.target.name] =e.target.files[0];
        this.setState({
            file: e.target.files[0]
        });
    }
    checkValue(e) {
        // this[e.target.name] = e.target.value;
        this.category = e.target.name;
        console.log(e.target.name);
        this.setState({
            holder: e.target.name
        });
        // this.state.arrayOfCategory.push(e.target.value);
    }
    insertPinInfo(e) {
        let pinColor = {
            museums: "/pins/bluePin.png",
            bars: "/pins/pinkPin.png",
            restaurants: "/pins/yellowPin.png",
            parks: "/pins/greenPin.png",
            sightseeing: "/pins/purplePin.png",
            general: "/pins/greyPin.png"
        };
        let cat;
        if (!this.category) {
            cat = "general";
        } else {
            cat = this.category;
        }
        let pinInfo = {
            description: this.description,
            title: this.title,
            category: cat,
            lat: this.props.lat,
            lng: this.props.lng,
            color: pinColor[cat]
        };
        const formData = new FormData();
        formData.append("file", this.state.file);

        this.props.dispatch(insertPinInfo({ formData, pinInfo }));
        this.toggle();
    }
    toggle() {
        if (this.props.toggleAddNewPinComponent) {
            this.props.toggleAddNewPinComponent();
        } else {
            this.props.mapHasBinClicked();
        }
    }

    render() {
        document.addEventListener("keydown", (e) => {
            if (e.keyCode == 27) {
                if (this.props.toggleAddNewPinComponent) {
                    this.props.toggleAddNewPinComponent();
                } else {
                    this.props.mapHasBinClicked();
                }
            }
        });
        const category = (color, text, variable) => {
            let str = "/pins/" + color + "Pin.png";
            return (
                <div className="pinCategory">
                    {/* <input
                        type="checkbox"
                        id={variable}
                        name={variable}
                        onClick={this.checkValue}
                    /> */}
                    <div className="pinCheckBox">
                        <img
                            src="/pins/checkbox.png"
                            className="icons"
                            name={variable}
                            onClick={this.checkValue}
                        />
                        <img src={str} className="pinIcon" />

                        {this.state.holder == variable && (
                            <img
                                src="/pins/pinkTick.png"
                                className="tickIcon"
                            />
                        )}
                    </div>
                    <div className="pinText">
                        <label>{text}</label>
                    </div>
                </div>
            );
        };
        return (
            <React.Fragment>
                <div className="blackVail" onClick={this.toggle} />
                <div className="newPinContainer">
                    <p id="exit" onClick={this.toggle}>
                        X
                    </p>
                    <div className="fieldsContainer">
                        <div className="pinTitle box">
                            <h1>
                                <img src="/pins/bigPin.png" />
                                <span className="addPinTitle"> add pin</span>
                            </h1>
                        </div>
                        <div className="pinOptions box">
                            <div className="pinMenu">
                                <form>
                                    {/* <div className="pinCategory">
                                        <div className="pinCheckBox">
                                            <img
                                                src="/pins/checkbox.png"
                                                className="icons"
                                            />
                                            <img
                                                src="/pins/bluePin.png"
                                                className="pinIcon"
                                            />
                                            <img
                                                src="/pins/pinkTick.png"
                                                className="tickIcon"
                                            />
                                        </div>
                                        <div className="pinText">Museums</div>
                                    </div> */}
                                    {category("blue", "Museums", "museums")}
                                    {category("green", "Parks", "parks")}
                                    {category(
                                        "yellow",
                                        "Restaurants",
                                        "restaurants"
                                    )}
                                    {category("pink", "Bars", "bars")}
                                    {category(
                                        "purple",
                                        "Sightseeing",
                                        "sightseeing"
                                    )}
                                </form>
                            </div>
                            <div className="addPinPicture">
                                <div className="cameraIconContainer">
                                    <input
                                        id="inputfile"
                                        className="inputfile"
                                        type="file"
                                        name="file"
                                        onChange={this.setFile}
                                        data-multiple-caption="{count} files selected"
                                        multiple
                                    />
                                    <label htmlFor="inputfile">
                                        <img
                                            src="/pins/camera.png"
                                            className="cameraIcon"
                                        />
                                    </label>
                                </div>
                                <textarea
                                    placeholder="Title"
                                    className="titleTextarea"
                                    type="text"
                                    name="title"
                                    rows="1"
                                    onChange={this.handleChange}
                                />
                                <textarea
                                    placeholder="Add Description"
                                    className="descriptionTextarea"
                                    type="text"
                                    name="description"
                                    onChange={this.handleChange}
                                    rows="3"
                                />
                            </div>
                        </div>
                        <div className="pinDescription box">
                            <h1
                                className="saveButton"
                                onClick={this.insertPinInfo}
                            >
                                SAVE
                            </h1>
                        </div>
                    </div>
                </div>

                {/* <div className="markerInput">
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
                                    onClick={this.checkValue}
                                />
                                <label htmlFor="museums">MuseumsZZ</label>

                                <input
                                    type="checkbox"
                                    id="bars"
                                    name="bars"
                                    onClick={this.checkValue}
                                />
                                <label htmlFor="bars">Bars</label>

                                <input
                                    type="checkbox"
                                    id="restaurants"
                                    name="restaurants"
                                    onClick={this.checkValue}
                                />
                                <label htmlFor="restaurants">
                                    {" "}
                                    Restaurants{" "}
                                </label>

                                <input
                                    type="checkbox"
                                    id="parks"
                                    name="parks"
                                    onClick={this.checkValue}
                                />
                                <label htmlFor="parks">Parks</label>

                                <input
                                    type="checkbox"
                                    id="sightseeing"
                                    name="sightseeing"
                                    onClick={this.checkValue}
                                />
                                <label htmlFor="sightseeing">
                                    {" "}
                                    Sightseeing{" "}
                                </label>
                            </div>
                        </form>

                    </div>
                </div> */}
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps)(AddNewPin);
