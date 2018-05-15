import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "./axios";
import { Logo, Login } from "./welcome";
import { ProfilePic } from "./profile";

// import { OnlineUsers } from "./onlineUsers";
import MapContainer from "./mapcontainer";
import Chat from "./chat";

export default function Navigation(props) {
    let pic = props.profilepic || "/icons/redUserIcon.png";
    return (
        <div className="navigationContainer">
            {/*<Logo />*/}
            <div className="navigationIconBar">
                <Link to="/mapREDUX">
                    {" "}
                    <img className="logoIconMenu" src="/pinAppLogo.png" />{" "}
                </Link>
                {/*<Link to="/user"> Hello {props.first}</Link>*/}
                <a href="/logout"> Logout </a>
                {/*<Link to="/onlineUsers"> Online </Link>*/}

                <Link to="/friends"> Friends </Link>
                {/*<Link to="/chat"> Chat </Link>*/}
                {/*<Link to="/mapREDUX"> MapAppREDUX </Link>*/}
                <div className="navigationBarRight">
                    <Link to="/map">
                        {" "}
                        <img
                            src="/icons/mapWithPin.png"
                            className="navigationIcon"
                        />{" "}
                    </Link>
                    <Link to="/editProfile"> </Link>
                    <Link to="/user">
                        {" "}
                        <div className="navigationIconProfilepicCircle">
                        <img
                            src={pic}
                            className="navigationIconProfilepic"
                        />{" "}
                        </div>
                    </Link>
                    {/*<ProfilePic {...props} />*/}
                    {/*<ProfilePage {...props} />*/}
                </div>
            </div>
        </div>
    );
}
