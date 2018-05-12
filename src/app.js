import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, HashRouter, Route } from "react-router-dom";

import { Welcome, Logo, Login } from "./welcome";
import axios from "axios";
import { ProfilePage, ProfilePic, UploadProfilePic, EditBio } from "./profile";
import Navigation from "./navigation";
import { OtherProfilePage } from "./otherProfile";
import Friends from "./friends";
import { composeWithDevTools } from "redux-devtools-extension";
import OnlineUsers from "./onlineUsers";
import Chat from "./chat";
import MapApp from "./map";

// import { EditBio , ExistingBio } from './bio';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showUploader = this.showUploader.bind(this);
        this.changeImage = this.changeImage.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
        this.toggleUploader = this.toggleUploader.bind(this);
        this.fileToUpload = {};
        this.state.toggleUploader = false;
        this.changeInputValues = this.changeInputValues.bind(this);
    }

    toggleUploader() {
        console.log('toggle uploader!');
        this.setState({
            toggleUploader: !this.state.toggleUploader
        });
    }
    showUploader() {
        this.setState({
            uploaderIsVisible: true
        });
    }
    changeImage(img) {
        this.setState({
            profilepic: img,
            uploaderIsVisible: false
        });
    }

    changeInputValues(inputValues) {
        console.log('changeinputvalues...',inputValues);
        let {id , first, last, email, bio} = inputValues;
        this.setState({
            id,
            first,
            last,
            email,
            bio
        })
    }

    hideUploader() {
        console.log("hiding uploader...");
        this.setState({
            uploaderIsVisible: false
        });
    }

    componentDidMount() {
        axios.get("/getUser").then(response => {
            if (response.data.success) {
                // console.log("response.data.user?????",response.data.user);
                this.setState(response.data.user);
            } else {
                console.log(
                    "response.data in getUser had an error ",
                    response.data
                );
            }
        });
    }
    componentWillReceiveProps() {
        console.log("inside componentWillReceiveProps state:",this.state);
    }
    render() {
        if (!this.state) {
            return (
                <div>
                    <p> LOADING </p>
                </div>
            );
        }
        return (
            <div className="routeContainer">
                <BrowserRouter>
                    <div className="container">
                        <Navigation
                            {...this.state}
                            toggleUploader={this.toggleUploader}
                            makeUploaderVisible={this.showUploader}
                            hideUploader={this.hideUploader}
                        />
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <ProfilePage
                                    {...this.state}
                                    toggleUploader={this.toggleUploader}
                                    makeUploaderVisible={this.showUploader}
                                    hideUploader={this.hideUploader}
                                    changeInputValues={this.changeInputValues}
                                />
                            )}
                        />
                        <Route
                            path="/user"
                            render={() => (
                                <ProfilePage
                                    {...this.state}
                                    toggleUploader={this.toggleUploader}
                                    makeUploaderVisible={this.showUploader}
                                    hideUploader={this.hideUploader}
                                    changeInputValues={this.changeInputValues}
                                />
                            )}
                        />

                        <Route
                            exact
                            path="/user/:id"
                            component={OtherProfilePage}
                        />

                        <Route exact path="/friends" component={Friends} />

                        <Route
                            exact
                            path="/onlineUsers"
                            component={OnlineUsers}
                        />
                        <Route exact path="/chat" component={Chat} />
                        <Route exact path="/map" component={MapApp} />
                    </div>
                </BrowserRouter>
                {this.state.toggleUploader && (
                    <UploadProfilePic
                        changeImage={this.changeImage}
                        hideUploader={this.hideUploader}
                        toggleUploader={this.toggleUploader}
                    />
                )}
            </div>
        );
    }
}
