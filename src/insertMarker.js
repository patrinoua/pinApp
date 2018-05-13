import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "./axios";
// import { emit } from "./socket";
import {} from "./actions";
function mapStateToProps(state) {
    console.log("mapStateToProps", state.users);
    return {
        friends: state.users && state.users.filter((user) => user.status == 2),
        wannabes:
            state.users &&
            state.users.filter(
                (user) => user.status == 1 && user.receiver_id != user.id
            )
    };
}
export class InsertMarker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.setFile = this.setFile.bind(this);
        this.checkValue = this.checkValue.bind(this);
        this.upload = this.upload.bind(this);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    setFile(e) {
        // this[e.target.name] = e.target.files[0];
        this.setState({
            file: e.target.files[0]
        });
        // file = e.target.files[0];
        // this.setState({
        //     file: e.target.files[0]
        // });
    }
    checkValue(e) {
        this.catagory = e.target.value;
        this[e.target.name] = e.target.value;

        this.state.arrayOfCatagory.push(e.target.value);
    }
    upload(e) {
        let obj = {
            description: this.description,
            title: this.title,
            catagory: this.catagory,
            lat: this.state.lat,
            lng: this.state.lng
        };
        axios
            .post("/markerInfo", obj)
            .then((response) => {
                const formData = new FormData();
                let old = response.data;
                formData.append("file", this.state.file);
                axios
                    .post("/uploadMarkerPic", formData)
                    .then((resp) => {
                        let arr = [];
                        old.marker.url = resp.data.url;
                        arr.push(old.marker);
                        let arr2 = this.state.markerToShow.concat(arr);
                        this.setState({
                            markerToShow: [...arr2],
                            showMarkerInput: null
                        });
                    })
                    .catch((err) => {
                        console.log(`error in pic upload: ${err}`);
                    });
            })
            .catch(function(err) {
                console.log("there was an error in upload", err);
            });
    }
    render() {
        return (
            <React.Fragment>
                <div className="markerInput">
                    <input
                        placeholder="title"
                        name="title"
                        onChange={this.handleChange}
                    />
                    <input
                        placeholder="description"
                        name="description"
                        onChange={this.handleChange}
                    />
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
                                    value="museums"
                                    onClick={this.checkValue}
                                />
                                <label htmlFor="museums">Museums</label>
                                <input
                                    type="checkbox"
                                    id="bars"
                                    name="bars"
                                    value="bars"
                                    onClick={this.checkValue}
                                />
                                <label htmlFor="bars">Bars</label>
                                <input
                                    type="checkbox"
                                    id="restaurants"
                                    name="restaurants"
                                    value="restaurants"
                                    onClick={this.checkValue}
                                />
                                <label htmlFor="restaurants">Restaurants</label>
                                <input
                                    type="checkbox"
                                    id="parks"
                                    name="parks"
                                    value="parks"
                                    onClick={this.checkValue}
                                />
                                <label htmlFor="parks">Parks</label>
                                <input
                                    type="checkbox"
                                    id="sightseeing"
                                    name="sightseeing"
                                    value="sightseeing"
                                    onClick={this.checkValue}
                                />
                                <label htmlFor="sightseeing">Sightseeing</label>
                            </div>
                        </form>
                        <button onClick={this.upload}>Submit</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps)(InsertMarker);
