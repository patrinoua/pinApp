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
        this.state = {};
        this.toggleUserMenu = this.toggleUserMenu.bind(this);
        this.state.userMenuIsVisible = false;
    }
    toggleUserMenu() {
        this.setState({
            userMenuIsVisible: !this.state.userMenuIsVisible
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
                        <div className="navigationIconProfilepicCircle">
                            <img
                                src={pic}
                                className="navigationIconProfilepic"
                                onClick={this.toggleUserMenu}
                            />{" "}
                        </div>
                        {this.state.userMenuIsVisible && <UserMenuPopUp
                            toggleUserMenu={this.toggleUserMenu}
                            />}
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


export class UserMenuPopUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.state.userMenuIsVisible=false;
        this.closePopUp = this.closePopUp.bind(this);
    }

    closePopUp() {
        this.props.toggleUserMenu();
    }

    render(){
        console.log('lalalaaaa',this.state);
        document.addEventListener("keydown", (e) => {
            if (e.keyCode == 27) {
                if (this.closePopUp) {
                    this.closePopUp();
                }
            }
        });
        document.addEventListener("click", (e) => {
            console.log('click!');
            if(this.state.userMenuIsVisible){
                this.closePopUp();
            }
            console.log(this.state.userMenuIsVisible);
        });

        let pic = this.props.profilepic || "/neo.png"
        console.log('this needs to be false in order to show it!!! this.state.userMenuIsVisible',this.state.userMenuIsVisible);
        if(!this.state.userMenuIsVisible){

            return (
                <div className="dropDownContainer">
                    <div className="dropDownMenu">
                    <Link to="/friends" className="dropDownMenuItem"> Friends </Link>
                    <NamesToShow />
                    <Link to="/" className="dropDownMenuItem"> Profile </Link>
                    <div className="dropDownMenuItem"> Friends </div>
                        <a href="/logout" className="dropDownMenuItem"> Logout </a>
                                <button className="subtleButton" onClick={this.closePopUp}>
                                    Cancel!{" "}
                                </button>
                    </div>
                </div>
            );
        }else {
            return (<div></div>);
        }

    }
}
