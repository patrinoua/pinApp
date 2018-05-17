import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "./axios";
import { deletePin } from "./actions";
import { insertPinInfo, updatePinInfo } from "./actions";

class PinClick extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: null,
            lng: null,
            holder: null,
            ready: null,
            removeButtonText: "X",
            editMode: false,
            deleteAlertIsVisible: false
        };
        this.setFile = this.setFile.bind(this);
        this.compileData = this.compileData.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.insertPinInfo = this.insertPinInfo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setFile = this.setFile.bind(this);
        this.deletePinAlert = this.deletePinAlert.bind(this);
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
            })
            .catch((err) => {
                console.log(`error in PinClick componentDidMount: ${err}`);
            });
        // console.log("this.state.ready....",this.state);
    }

    toggleEditMode(e) {
        if (!this.state.editMode) {
            // this.insertPinInfo(e)
            this.setState({
                editMode: true
            });
        } else {
            this.setState({
                editMode: false
            });
            // this.props.togglePinClick();
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
        // let pinColor = {
        //     museums: "/pins/bluePin.png",
        //     bars: "/pins/pinkPin.png",
        //     restaurants: "/pins/yellowPin.png",
        //     parks: "/pins/greenPin.png",
        //     sightseeing: "/pins/purplePin.png",
        //     general: "/pins/greyPin.png"
        // };
        // let cat;
        // if (!this.category) {
        //     cat = "general";
        // } else {
        //     cat = this.category;
        // }
        let pinInfo = {
            description: this.description,
            title: this.title,
            pinId: this.props.pinId
        };
        const formData = new FormData();
        formData.append("file", this.state.file);
        this.props.dispatch(updatePinInfo({ formData, pinInfo }));
        this.toggleEditMode();
    }
    compileData(e) {
        this.setState(
            {
                file: e.target.files[0]
            },
            () => {
                try {
                    let selectedImg = new FileReader();
                    selectedImg.readAsDataURL(this.state.file);
                    selectedImg.addEventListener("load", () => {
                        this.setState({ dataUrl: selectedImg.result });
                    });
                } catch (err) {
                    console.log(`error in compileData: ${err}`);
                }
            }
        );
    }
    deletePinAlert() {
        console.log(this.props.pinId);
        this.setState({
            deleteAlertIsVisible: true
        });

        if (this.state.deleteAlertIsVisible == true) {
            console.log("about to really delete pin");
            console.log(this.props.pinId);
            this.props.dispatch(deletePin(this.props.pinId));
            this.setState({
                deleteAlertIsVisible: false
            });
            this.props.togglePinClick();
        }
        // console.log("this.state.deleteAlertIsVisible",this.state.deleteAlertIsVisible);
        // onClick={this.toggleEditMode}
    }

    render() {
        const shareButtons = () => {
            return (
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
            );
        };
        const deleteAlert = () => {
            return (
                <div className="blackVailDelete">
                    delete pin?
                    <button
                        onClick={() => {
                            this.deletePinAlert();
                        }}
                    >
                        {" "}
                        yes{" "}
                    </button>
                    <button
                        onClick={() => {
                            this.setState({
                                deleteAlertIsVisible: false
                            });
                            console.log("lala");
                        }}
                    >
                        {" "}
                        no{" "}
                    </button>
                </div>
            );
        };

        let currentPinInfo = this.props.markersArray.filter((item) => {
            return item.id == this.props.pinId;
        });
        let imageUrl;

        if (currentPinInfo[0].url) {
            imageUrl = currentPinInfo[0].url;
        } else {
            imageUrl = "/pins/greyPin.png";
        }

        console.log(currentPinInfo);
        return (
            <React.Fragment>
                <div className="pinClickContainer">
                    <div
                        className="blackVail"
                        onClick={this.props.togglePinClick}
                    />
                    <p id="exit" onClick={this.props.togglePinClick}>
                        X
                    </p>

                    <div className="fieldsContainerPinClick">
                        <div className="pinTitle box">
                            <h1>
                                <img src="/pins/bigPin.png" />
                                <span className="addPinTitle">
                                    {currentPinInfo[0].title || "clicked pin"}
                                </span>
                            </h1>
                        </div>
                        <div className="secondRowPinClick">
                            <div className="boxPinClick mapContainerPinClick">
                                <img src="/map.png" />
                            </div>

                            <div className="boxPinClick">
                                {(this.state.editMode && (
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
                                )) || (
                                    <div
                                        className="galleryItemsContainer"
                                        style={{
                                            backgroundImage: `url(${imageUrl})`
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        {/* *******************THIRD ROW**********************/}
                        {(this.state.editMode && (
                            <div className="thirdRowPinClick">
                                <div className="colPinClick">
                                    <div className="textFieldsPinClick">
                                        <textarea
                                            placeholder={
                                                currentPinInfo[0].title ||
                                                "Title"
                                            }
                                            className="titleTextareaPinClick"
                                            type="text"
                                            name="title"
                                            rows="1"
                                            onChange={this.handleChange}
                                        />
                                        <textarea
                                            placeholder={
                                                currentPinInfo[0].description ||
                                                "Description"
                                            }
                                            className="descriptionTextareaPinClick"
                                            type="text"
                                            name="description"
                                            onChange={this.handleChange}
                                            rows="1"
                                        />
                                    </div>
                                </div>
                                {shareButtons()}
                            </div>
                        )) || (
                            <div className="thirdRowPinClick">
                                <div className="colPinClick ">
                                    <div>
                                        {currentPinInfo[0].title || "Title"}
                                    </div>
                                    <div>
                                        {currentPinInfo[0].description ||
                                            "Description"}
                                    </div>
                                </div>
                                {shareButtons()}
                            </div>
                        )}

                        {/* *************************FOURTH ROW**********************/}

                        {(this.state.editMode && (
                            <div className="pinEditSaveButtonArea box">
                                <h1
                                    className="saveButton"
                                    onClick={this.insertPinInfo}
                                >
                                    {" "}
                                    SAVE{" "}
                                </h1>
                                <h1
                                    className="saveButton"
                                    onClick={this.toggleEditMode}
                                >
                                    {" "}
                                    Cancel{" "}
                                </h1>
                                <h1
                                    className="saveButton"
                                    onClick={this.deletePinAlert}
                                >
                                    {" "}
                                    Delete pin{" "}
                                </h1>
                                {this.state.deleteAlertIsVisible &&
                                    deleteAlert()}
                            </div>
                        )) || (
                            <div className="pinEditSaveButtonArea box">
                                <h1
                                    className="saveButton"
                                    onClick={this.toggleEditMode}
                                >
                                    {" "}
                                    EDIT{" "}
                                </h1>
                            </div>
                        )}
                    </div>
                </div>
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
