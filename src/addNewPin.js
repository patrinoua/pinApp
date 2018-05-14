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
            lng: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.setFile = this.setFile.bind(this);
        this.checkValue = this.checkValue.bind(this);
        this.insertPinInfo = this.insertPinInfo.bind(this);

    }
    componentDidMount(){
        console.log('add new pin.. is visible!');
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
        this.category = e.target.value;
        // this.state.arrayOfCategory.push(e.target.value);
    }
    insertPinInfo(e) {
        let pinColor = {
            museums: "/pins/bluePin.png",
            bars: "/pins/pinkPin.png",
            restaurants: "/pins/yellowPin.png",
            parks: "/pins/greenPin.png",
            sightseeing: "/pins/purplePin.png"
        };
        let cat = this.category
        let pinInfo = {
            description: this.description,
            title: this.title,
            category: this.category,
            lat: this.props.lat,
            lng: this.props.lng,
            color: pinColor[cat]
        };
        const formData = new FormData();
        formData.append("file", this.state.file);

        this.props.dispatch(insertPinInfo({formData, pinInfo}))

    }

    render() {
        return (
            <React.Fragment>
                <h1> add new pin..</h1>
                <div className="markerInput">
                    <input placeholder="title" name="title" onChange={this.handleChange}/>
                    <input placeholder="description" name="description" onChange={this.handleChange}/>

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
                                <input type="checkbox" id="museums" name="museums" value="museums" onClick={this.checkValue}/>
                                <label htmlFor="museums">Museums</label>

                                <input type="checkbox" id="bars" name="bars" value="bars" onClick={this.checkValue}/>
                                <label htmlFor="bars">Bars</label>

                                <input type="checkbox" id="restaurants" name="restaurants" value="restaurants" onClick={this.checkValue}/>
                                <label htmlFor="restaurants"> Restaurants </label>

                                <input type="checkbox" id="parks" name="parks" value="parks" onClick={this.checkValue}/>
                                <label htmlFor="parks">Parks</label>

                                <input type="checkbox" id="sightseeing" name="sightseeing" value="sightseeing" onClick={this.checkValue}/>
                                <label htmlFor="sightseeing"> Sightseeing </label>
                            </div>
                        </form>
                        <button onClick={this.insertPinInfo}>Submit</button>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps)(AddNewPin);
