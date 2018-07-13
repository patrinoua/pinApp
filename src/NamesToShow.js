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
        // document.addEventListener("keydown", (e) => {
        //     if (e.keyCode == 38) {
        //         console.log("up");
        //     }
        //     if (e.keyCode == 40) {
        //         console.log("down");
        //     }
        // });
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
    componentDidMount() {
        console.log("opened search box");
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

class ListOfNames extends React.Component {
    constructor(props) {
        super(props);
        this.nameToFocus = React.createRef();
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.state = {
            nameCounter: 0
        };
    }
    handleKeyPress(e) {
        console.log("this.state.nameCounter: ", this.state.nameCounter);
        if (e.keyCode == 13) {
            console.log("enter!");
            e.target.trigger("click");
        }
        if (e.keyCode == 37) {
            console.log("arrow left");
        }
        if (e.keyCode == 38) {
            console.log("arrow up", this.state.nameCounter);
            if (this.state.nameCounter == 0) {
                this.setState(
                    {
                        nameCounter:
                            document.getElementsByClassName(
                                "theNamesToShowInSearch"
                            ).length - 1
                    },
                    () => {
                        console.log(
                            "go to the last element",
                            this.state.nameCounter
                        );
                    }
                );
            } else {
                this.setState(
                    {
                        nameCounter: this.state.nameCounter - 1
                    },
                    () => {
                        console.log("decrease by 1", this.state.nameCounter);
                    }
                );
            }
        }
        if (e.keyCode == 40) {
            console.log("arrow down: ", this.state.nameCounter);
            if (
                this.state.nameCounter ==
                document.getElementsByClassName("theNamesToShowInSearch")
                    .length -
                    1
            ) {
                this.setState(
                    {
                        nameCounter: 0
                    },
                    () => {
                        console.log(
                            "we were on the last element so we set this.state.nameCounter to 0",
                            this.state.nameCounter
                        );
                    }
                );
            } else {
                this.setState({
                    nameCounter: this.state.nameCounter + 1
                });
                console.log(
                    "new i when on random element, so we set this.state.nameCounter to",
                    this.state.nameCounter
                );
            }
        }
        document
            .getElementsByClassName("theNamesToShowInSearch")
            [this.state.nameCounter].focus();
    }
    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);
    }

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyPress);
        document
            .getElementsByClassName("theNamesToShowInSearch")
            [this.state.nameCounter].focus();
    }

    render() {
        return (
            <div className="searchUsers">
                {this.props.names.map((item, i) => {
                    console.log("item, i", item, i);
                    console.log("item, i", item, i);
                    if (item.id == this.props.id) {
                        return (
                            <Link
                                className={
                                    this.state.nameCounter == i
                                        ? "theNamesToShowInSearch highlightedName"
                                        : "theNamesToShowInSearch"
                                }
                                to={`/`}
                                key={item.id}
                                onClick={this.props.removeSearchBar}
                            >{`${item.first} ${item.last}`}</Link>
                        );
                    } else {
                        return (
                            <Link
                                className={
                                    this.state.nameCounter == i
                                        ? "theNamesToShowInSearch highlightedName"
                                        : "theNamesToShowInSearch"
                                }
                                to={`/user/${item.id}`}
                                key={item.id}
                                ref={this.nameToFocus}
                                onClick={this.props.removeSearchBar}
                            >{`${item.first} ${item.last}`}</Link>
                        );
                    }
                })}
            </div>
        );
    }
}
// function ListOfNames(props) {
//     return (
//         <div className="searchUsers" ref={this.nameToFocus}>
//             {props.names.map((item) => {
//                 if (item.id == props.id) {
//                     return (
//                         <Link
//                             className="theNamesToShowInSearch"
//                             to={`/`}
//                             key={item.id}
//                             onClick={props.removeSearchBar}
//                         >{`${item.first} ${item.last}`}</Link>
//                     );
//                 } else {
//                     return (
//                         <Link
//                             className="theNamesToShowInSearch"
//                             to={`/user/${item.id}`}
//                             key={item.id}
//                             onClick={props.removeSearchBar}
//                         >{`${item.first} ${item.last}`}</Link>
//                     );
//                 }
//             })}
//         </div>
//     );
// }
