import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "./axios";
import { Logo, Login } from "./welcome";
import { ProfilePic } from "./profile";
// import { UserMenu, UserMenuPopUp } from "./menus";
import { NamesToShow } from "./NamesToShow";
import ListOfLocations from "./ListOfLocations.js";

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
        this.showListComponent = this.showListComponent.bind(this);
        this.closeListComponent = this.closeListComponent.bind(this);
    }
    showListComponent(e) {
        this.setState({
            showListComponent: true
        });
    }
    closeListComponent(e) {
        this.setState({
            showListComponent: false
        });
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
        let pic = this.props.profilepic || "/user.png";
        const style = {
            backgroundImage: `url(${pic})`
        };

        return (
            <div className="navigationContainerBig">
                <div className="navigationContainer">
                    <Link to="/map">
                        {" "}
                        <img
                            className="logoIconMenu"
                            src="/pinAppLogo.png"
                        />{" "}
                    </Link>
                    <div className="navigationBarRight">
                        <div className="navigationIconProfilepicCircle" style={style} onClick={this.toggleUserMenu}>
                        </div>
                        {this.props.first}
                        <img
                            src="/icons/pinsIcon.png"
                            className="navigationIcon"
                            onClick={this.showListComponent}
                        />{" "}
                        <Link to="/map">
                            {" "}
                            <img
                                src="/icons/mapIcon.png"
                                className="navigationIcon"
                            />{" "}
                        </Link>

                        <Link to="/editProfile"> </Link>

                        {this.state.userMenuIsVisible && (
                            <UserMenuPopUp
                                id={this.props.id}
                                toggleUserMenu={this.toggleUserMenu}
                                closeUserMenu={this.closeUserMenu}
                                userMenuIsVisible={this.state.userMenuIsVisible}
                            />
                        )}
                        {this.state.showListComponent && (
                            <ListOfLocations closeListComponent={this.closeListComponent} />
                        )}
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
        this.closePopUp = this.closePopUp.bind(this);
    }
    closePopUp() {
        this.props.closeUserMenu();
    }
    render() {
        document.addEventListener("anim", (e) => {
            if (e.keyCode == 27) {
                this.props.closeUserMenu();
            }
        });
        let pic = this.props.profilepic || "/user.png";
        return (
            <React.Fragment>
                <div
                    id="overley"
                    onClick={(e) => {
                        this.props.closeUserMenu();
                        // e.stopPropagation();
                        // e.preventDefault();
                    }}
                />
                <div
                    className="dropDownMenu"
                    id="anim"
                >
                {/*onMouseLeave={() => {
                    this.props.closeUserMenu();
                }}*/}
                    <Link to="/profile" className="dropDownMenuItem">
                        My Profile
                    </Link>
                    <Link to="/friends" className="dropDownMenuItem">
                        Friends
                    </Link>

                    <a href="/logout" className="dropDownMenuItem">
                        Logout
                    </a>
                    <NamesToShow id={this.props.id} />
                </div>
            </React.Fragment>
        );
    }
}
