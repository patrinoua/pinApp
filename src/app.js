import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, HashRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { Welcome, Logo, Login } from "./welcome";
import axios from "./axios";
import { ProfilePage, ProfilePic, UploadProfilePic, EditBio } from "./profile";
import { Navigation } from "./navigation";
import OtherProfilePage from "./otherProfile";
import Friends from "./friends";
import { composeWithDevTools } from "redux-devtools-extension";
import OnlineUsers from "./onlineUsers";
import Chat from "./chat";
import MapContainer from "./mapcontainer";
import { saveUserInfo } from "./actions";
// import { EditBio , ExistingBio } from './bio';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.showUploader = this.showUploader.bind(this);
        this.changeImage = this.changeImage.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
        this.toggleUploader = this.toggleUploader.bind(this);
        this.fileToUpload = {};
        this.state.toggleUploader = false;
        this.changeInputValues = this.changeInputValues.bind(this);
    }

    toggleUploader() {
        console.log("toggle uploader!");
        this.setState({
            toggleUploader: !this.state.toggleUploader
        });
    }

    // showUploader() {
    //     this.setState({
    //         uploaderIsVisible: true
    //     });
    // }
    changeImage(img) {
        this.setState({
            profilepic: img,
            uploaderIsVisible: false
        });
    }

    changeInputValues(inputValues) {
        console.log("changeinputvalues...", inputValues);
        let { id, first, last, email, bio } = inputValues;
        this.setState({
            id,
            first,
            last,
            email,
            bio
        });
    }

    hideUploader() {
        console.log("hiding uploader...");
        this.setState({
            uploaderIsVisible: false
        });
    }

    componentDidMount() {
        // navigator.geolocation.getCurrentPosition((position) => {
        //     this.setState({
        //         lat: position.coords.latitude,
        //         lng: position.coords.longitude
        //     });
        // });
        axios.get("/getUser").then((response) => {
            if (response.data.success) {
                this.props.dispatch(saveUserInfo(response.data.user));
                this.setState(response.data.user);
            } else {
                console.log(
                    "response.data in getUser had an error ",
                    response.data
                );
            }
        });
    }

    render() {
        return (
            <div className="routeContainer">
                <BrowserRouter>
                    <div className="appContainer">
                        <Navigation
                            {...this.state}
                            toggleUploader={this.toggleUploader}
                            makeUploaderVisible={this.showUploader}
                            hideUploader={this.hideUploader}
                            userMenuPopUpStatus={this.state.toggleUserMenu}
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
                            exact
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
                        <Route path="/friends" component={Friends} />

                        <Route
                            exact
                            path="/user/:id"
                            render={(x) => (
                                <OtherProfilePage
                                    lat={this.state.lat}
                                    lng={this.state.lng}
                                    match={x.match}
                                    history={x.history}
                                    id={this.state.id}
                                />
                            )}
                        />

                        <Route
                            exact
                            path="/onlineUsers"
                            component={OnlineUsers}
                        />

                        {/*<Route exact path="/chat" component={Chat} />*/}

                        <Route
                            path="/map"
                            render={() => (
                                <MapContainer
                                    lat={this.state.lat}
                                    lng={this.state.lng}
                                    {...this.state}
                                />
                            )}
                        />
                    </div>
                </BrowserRouter>
                {/*<UserMenu />*/}
                {this.state.toggleUploader && (
                    <UploadProfilePic
                    changeImage={this.changeImage}
                    hideUploader={this.hideUploader}
                    toggleUploader={this.toggleUploader}
                    />
                )}
                {/*{this.state.toggleUserMenu &&
                    (<UserMenuPopUp
                    toggleUserMenu={this.toggleUserMenu}
                    userMenuPopUpStatus={this.state.toggleUserMenu}
                    />)
                }*/}
            </div>
        );
    }
}
const mapStateToProps = function(state) {
    return {
        markersArray: state.markersArray
        // pins: state.onlineUsers
    };
};
export default connect(mapStateToProps)(App);
