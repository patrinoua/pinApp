import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "./axios";
import { deletePin } from "./actions";
import { insertPinInfo } from "./actions";

class PinClick extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: null,
            lng: null,
            holder: null,
            ready: null,
            removeButtonText: "X",
            editMode:false
        };
        this.setFile = this.setFile.bind(this);
        this.compileData = this.compileData.bind(this);
        this.deletePin = this.deletePin.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.insertPinInfo = this.insertPinInfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setFile = this.setFile.bind(this);
    }
    componentDidMount() {
        axios
            .post("/PinClick", { pinId: this.props.pinId })
            .then(response => {
                this.setState({
                    title: response.data.pinInfo.title,
                    category: response.data.pinInfo.category,
                    url: response.data.pinInfo.url,
                    description: response.data.pinInfo.description,
                    created_at: response.data.pinInfo.created_at,
                    userId: response.data.pinInfo.user_id,
                    ready: true
                });
            })
            .catch(err => {
                console.log(`error in PinClick componentDidMount: ${err}`);
            });
        // console.log("this.state.ready....",this.state);
    }

    toggleEditMode(e){
        if(!this.state.editMode){
            this.insertPinInfo(e)
            this.setState({
                editMode:true
            })
        }else{
            this.setState({
                editMode:false
            })
            this.props.togglePinClick();
        }
    }
    setFile(e) {
        this.setState({
            file: e.target.files[0]
        });
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    setFile(e) {
        this.setState({
            file: e.target.files[0]
        });
    }
    checkValue(e) {
        this.category = e.target.name;

        this.setState({
            holder: e.target.name
        });
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
    }
    compileData(e) {
        this.setState({
            file: e.target.files[0]
        });
        let selectedImg = new FileReader();
        selectedImg.readAsDataURL(e.target.files[0]);
        selectedImg.addEventListener("load", () => {
            this.setState({ dataUrl: selectedImg.result });
        });
    }
    deletePin() {
        this.props.dispatch(deletePin(this.props.pinId));
    }

    render() {

        return (
            <React.Fragment>
                <div className="pinClickContainer">
                    <div
                        className="blackVail"
                        onClick={this.props.togglePinClick}
                    />
                    {/*<p id="exit" onClick={this.props.togglePinClick}>X</p>*/}

                    <div
                        className="removePin"
                        id="exit"
                        onMouseOver={() => {
                            this.setState({
                                removeButtonText: "click to remove pin"
                            });
                        }}
                        onMouseLeave={() => {
                            this.setState({
                                removeButtonText: "X"
                            });
                        }}
                        onClick={this.deletePin}
                    >
                        {this.state.removeButtonText}
                    </div>

                    <div className="fieldsContainerPinClick">
                        <div className="pinTitle box">
                            <h1>
                                <img src="/pins/bigPin.png" />
                                <span className="addPinTitle">
                                    {" "}
                                    {this.state.title || "clicked pin"}
                                </span>
                            </h1>
                        </div>
                        <div className="secondRowPinClick">
                            <div className="boxPinClick mapContainerPinClick">
                                <img src="/map.png" />
                            </div>

                            <div className="boxPinClick">
                                {this.state.editMode
                                    && (
                                    <div className="galleryItemsContainer">
                                        <input
                                            id="inputfile"
                                            className="inputfile"
                                            type="file"
                                            name="file"
                                            onChange={this.setFile}
                                            onChange={this.compileData}
                                            data-multiple-caption="{count} files selected"
                                            multiple
                                        />
                                        <label htmlFor="inputfile">
                                            {(this.state.dataUrl && (
                                                <img
                                                    src={this.state.dataUrl}
                                                    className="uploadedImagePinclick"
                                                />
                                            )) || (
                                                <div className="cameraIconContainerPinClick">
                                                    <img
                                                        src="/pins/camera.png"
                                                        className="cameraIcon"
                                                    />
                                                </div>
                                            )}
                                        </label>
                                    </div>
                                )||(
                                    <div className="galleryItemsContainer">
                                        <img src={this.state.url || "/user.png"} className="existingPhoto"/>
                                    </div>
                                )
                            }
                            </div>
                        </div>
                        <div className="thirdRowPinClick ">
                            <div className="boxPinClick">
                                {/*<div className="ratingStars">
                                    *****
                                </div>*/}
                                {this.state.editMode&&(
                                <div className="colPinClick">

                                    <textarea
                                        placeholder="Title"
                                        className="titleTextareaPinClick"
                                        type="text"
                                        name="title"
                                        rows="1"
                                        onChange={this.handleChange}
                                    />
                                    <textarea
                                        placeholder="Add Description"
                                        className="descriptionTextareaPinClick"
                                        type="text"
                                        name="description"
                                        onChange={this.handleChange}
                                        rows="3"
                                    />
                                </div>
                            )||
                            (
                                    <div className="colPinClick">
                                        <div>
                                            {this.state.title || 'Title'}
                                        </div>
                                        <div>
                                            {this.state.description || 'Description'}
                                        </div>
                                    </div>
                            )
                        }
                            </div>
                            <div className="colPinClick">
                                <a
                                    href="https://www.facebook.com/"
                                    className="boxPinClick"
                                    target="blank"
                                >
                                    <img
                                        src="/icons/facebook.png"
                                        className="shareButtons"
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="pinEditSaveButtonArea box">
                            {this.state.editMode&&
                            (<h1 className="saveButton" onClick={this.toggleEditMode}> SAVE </h1>)
                        ||
                            (<h1 className="saveButton" onClick={this.toggleEditMode}> edit </h1>)
                        }
                            <button
                                onClick={this.props.togglePinClick}
                                className="saveButton"
                            >
                                Close
                            </button>
                            {/*{this.props.id == this.state.userId && (*/}
                            <button
                                onClick={this.deletePin}
                                className="saveButton"
                            >
                                Delete
                            </button>
                            {/*)}*/}
                        </div>
                    </div>
                </div>
    {/*onClick={this.insertPinInfo}*/}
                {/*<div id="clickPinHolder">

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


                    </div>
                </div>*/}
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
