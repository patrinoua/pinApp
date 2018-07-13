import React from "react";
import axios from "./axios";
import { BrowserRouter, Route, Link } from "react-router-dom";

export class NamesToShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { arrayOfNames: [] };
        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
        this.removeSearchBar = this.removeSearchBar.bind(this);
    }
    componentDidMount() {
        document.addEventListener("keydown", (e) => {
            if (e.keyCode == 38) {
                console.log("up");
            }
            if (e.keyCode == 40) {
                console.log("down");
            }
        });
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
        if (this.name) {
            axios
                .post("/userName", { name: this.name })
                .then((response) => {
                    let arr = response.data.data;

                    this.setState({ arrayOfNames: arr, showNames: true });
                })
                .catch((err) => {
                    console.log(`error in post/userName: ${err}`);
                });
        } else {
            this.setState({ showNames: null });
        }
    }
    search() {
        if (!this.state.showTextArea) {
            this.setState({ showTextArea: true });
        } else {
            this.setState({ showTextArea: null });
        }
    }
    removeSearchBar() {
        this.setState({ showTextArea: null });
    }
    render() {
        return (
            <React.Fragment>
                <div className="dropDownMenuItem" onClick={this.search}>
                    Search
                    <img
                        src="/search.png"
                        style={{
                            width: "16px",
                            paddingLeft: "4px",
                            transform: "translateY(3px)"
                        }}
                    />
                </div>
                {this.state.showTextArea && (
                    <div id="searchUsersBox">
                        <textarea
                            rows="2"
                            cols="15"
                            name="name"
                            onChange={this.handleChange}
                            placeholder="name?"
                        />
                        {this.state.showNames && (
                            <ListOfNames
                                id={this.props.id}
                                names={this.state.arrayOfNames}
                                removeSearchBar={this.removeSearchBar}
                            />
                        )}
                    </div>
                )}
            </React.Fragment>
        );
    }
}
function ListOfNames(props) {
    return (
        <div className="searchUsers">
            {props.names.map((item) => {
                if (item.id == props.id) {
                    return (
                        <Link
                            className="theNamesToShowInSearch"
                            to={`/`}
                            key={item.id}
                            onClick={props.removeSearchBar}
                        >{`${item.first} ${item.last}`}</Link>
                    );
                } else {
                    return (
                        <Link
                            className="theNamesToShowInSearch"
                            to={`/user/${item.id}`}
                            key={item.id}
                            onClick={props.removeSearchBar}
                        >{`${item.first} ${item.last}`}</Link>
                    );
                }
            })}
        </div>
    );
}
