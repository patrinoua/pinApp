import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "axios";
import { Logo, Login } from "./welcome";
import { ProfilePic } from "./profile";
// import { OnlineUsers } from "./onlineUsers";
import MapAppREDUX from "./mapREDUX";
import Chat from "./chat";

export default function Navigation(props) {
    return (
        <div id="navigation">
            {/*<Logo />*/}
            <Link to="/mapREDUX"> <img className="logoIconMenu" src="/pinAppLogo.png" /> </Link>
            {/*<Link to="/user"> Hello {props.first}</Link>*/}
            {/*<a href="/logout"> Logout </a>*/}
            {/*<Link to="/onlineUsers"> Online </Link>*/}
            {/*<Link to="/friends"> Friends </Link>*/}
            {/*<Link to="/chat"> Chat </Link>*/}
            {/*<Link to="/mapREDUX"> MapAppREDUX </Link>*/}
            <div className="navigationBarRight">
                <Link to="/mapREDUX"> <img src="icons/redPin.png" className="navigationIcon"/> </Link>
                <Link to="/editProfile"> <img src="icons/burgerMenuIcon.png" className="navigationIcon"/> </Link>
                <Link to="/editProfile">  </Link>
                <Link to="/user"> <img src="icons/redUserIcon.png" className="navigationIcon"/> </Link>
                {/*<ProfilePic {...props} />*/}
                {/*<ProfilePage {...props} />*/}
            </div>
        </div>
    );
}
