import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "./axios";
import { Logo, Login } from "./welcome";
import { ProfilePic } from "./profile";
// import { UserMenu, UserMenuPopUp } from "./menus";
import { NamesToShow } from "./NamesToShow";

// import { OnlineUsers } from "./onlineUsers";
import MapContainer from "./mapcontainer";
import Chat from "./chat";

export class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userMenuIsVisible: false
        };
        this.toggleUserMenu = this.toggleUserMenu.bind(this);
        this.closeUserMenu = this.closeUserMenu.bind(this);
    }
    toggleUserMenu() {
        this.setState({
            userMenuIsVisible: !this.state.userMenuIsVisible
        });
    }
    closeUserMenu() {
        this.setState({
            userMenuIsVisible: false
        });
    }
    render() {
        let pic = this.props.profilepic || "/neo.png";
        return (
            <div className="navigationContainer">
                <div className="navigationIconBar">
                    <Link to="/map">
                        {" "}
                        <img
                            className="logoIconMenu"
                            src="/pinAppLogo.png"
                        />{" "}
                    </Link>

                    <div className="navigationBarRight">
                        <Link to="/map">
                            {" "}
                            <img
                                src="/icons/mapWithPin.png"
                                className="navigationIcon"
                            />{" "}
                        </Link>
                        <Link to="/editProfile"> </Link>{" "}
                        <div
                            className="navigationIconProfilepicCircle"
                            onMouseEnter={this.toggleUserMenu}
                        >
                            <img
                                src={pic}
                                className="navigationIconProfilepic"
                                onClick={this.toggleUserMenu}
                            />{" "}
                        </div>
                        {this.state.userMenuIsVisible && (
                            <UserMenuPopUp
                                id={this.props.id}
                                toggleUserMenu={this.toggleUserMenu}
                                closeUserMenu={this.closeUserMenu}
                                userMenuIsVisible={this.state.userMenuIsVisible}
                            />
                        )}
                        {/*<ProfilePic {...props} />*/}
                        {/*<ProfilePage {...props} />*/}
                        {/*<Link to="/user"> Hello {props.first}</Link>*/}
                        {/*<Link to="/onlineUsers"> Online </Link>*/}
                        {/*<Link to="/chat"> Chat </Link>*/}
                        {/*<Link to="/mapREDUX"> MapAppREDUX </Link>*/}
                    </div>
                </div>
            </div>
        );
    }
}

export class UserMenuPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.userMenuIsVisible = false;
        this.closePopUp = this.closePopUp.bind(this);
        this.myMouseout = this.myMouseout.bind(this);
    }

    closePopUp() {
        this.props.closeUserMenu();
    }
    myMouseout(e) {
        this.props.closeUserMenu();
        // e.preventDefault();
    }
    render() {
        document.addEventListener("keydown", (e) => {
            if (e.keyCode == 27) {
                if (this.closePopUp) {
                    this.closePopUp();
                }
            }
        });

        // if (this.props.userMenuIsVisible) {
        //     document
        //         .getElementById("justForTarget")
        //         .addEventListener("mouseout", (e) => {
        //             console.log("this is the click im looking for");
        //             this.closePopUp();
        //         });
        // }
        let pic = this.props.profilepic || "/neo.png";
        console.log(
            "this needs to be false in order to show it!!! this.state.userMenuIsVisible",
            this.state.userMenuIsVisible
        );
        if (!this.state.userMenuIsVisible) {
            return (
                <div className="dropDownContainer">
                    <div
                        className="dropDownMenu"
                        onMouseLeave={this.myMouseout}
                    >
                        <Link to="/friends" className="dropDownMenuItem">
                            {" "}
                            Friends{" "}
                        </Link>
                        <NamesToShow id={this.props.id} />
                        <Link to="/" className="dropDownMenuItem">
                            {" "}
                            Profile{" "}
                        </Link>
                        <div className="dropDownMenuItem"> Friends </div>
                        <a href="/logout" className="dropDownMenuItem">
                            {" "}
                            Logout{" "}
                        </a>
                        <button
                            className="subtleButton"
                            onClick={this.closePopUp}
                        >
                            Cancel!{" "}
                        </button>
                    </div>
                </div>
            );
        } else {
            return <div />;
        }
    }
}
