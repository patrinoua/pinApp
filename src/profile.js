import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "./axios";
import { Welcome, Logo, Login } from "./welcome";

// import { EditBio, ExistingBio } from "./bio";

export class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorIsVisible: false ,
            deleteAccountNotificationWindowIsVisible:true
        };
        this.pic = this.props.profilepic;
        this.bio = this.props.bio;
        this.toggleEditor = this.toggleEditor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveNewInputValue = this.saveNewInputValue.bind(this);
        this.setFile = this.setFile.bind(this);
        this.showDeleteAccountNotification = this.showDeleteAccountNotification.bind(this);
    }
    showDeleteAccountNotification(){
        console.log('about to show notification');
        this.setState({
            deleteAccountNotificationWindowIsVisible:true
        })
        console.log("deleteAccountNotificationWindowIsVisible",this.state.deleteAccountNotificationWindowIsVisible);
    }
    toggleEditor() {
        this.setState({
            editorIsVisible: !this.state.editorIsVisible
        });
    }
    inputField(inputValue, state) {
        return <div>I wonder...</div>;
    }
    changeInputValues(inputValues) {
        this.props.changeInputValues(inputValues);
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
        console.log(e.target.name);
    }
    saveNewInputValue() {
        let inputName = this.first || this.lastname;
        console.log('this... in profile', this);
        axios
            .post(`/updateUserInfo/`, {
                first: this.first,
                last: this.last,
                email: this.email,
                bio: this.bio,
                pass: this.pass
            })
            .then((response) => {
                if (response.data.user) {
                    this.props.changeInputValues(response.data.user);
                    setTimeout(this.toggleEditor, 300);
                } else {
                    console.log(
                        "response.data in register error ",
                        response.data.errorMsg
                    );
                }
            })
            .catch((err) => {
                console.log("PROBLEM :(", err);
            });
    }
    setFile(e) {
        this.file = e.target.files[0];
        var formData = new FormData();

        formData.append("file", this.file);
        axios
            .post("/updateProfilepic", formData)
            .then((response) => {
                if (response.data.success) {
                    this.props.changeImage(response.data.profilepic);
                    // this.props.changeImage(response.data.profilepic);
                }
            })
            .catch((err) => {
                console.log(`error in updateProfilepic ${err}`);
            });
    }
    // this.state.profilepic ||
    render() {
        let pic = this.props.profilepic || "/user.png";
        let bio = this.props.bio || "Tell us something about yourself!";

        const style = {
            backgroundImage: `url(${pic})`
        };

        const existingValue = (textToShow, propertyKey) => {
            return (
                <div className="profileInputField">
                    <div className="inputPropertyName">{textToShow}</div>
                    <div className="inputPropertyValue">{propertyKey}</div>
                </div>
            );
        };
        const inputField = (textToShow, fieldname, propertyKey) => {
            return (
                <div className="profileInputField">
                    <div className="inputPropertyName">{textToShow}</div>
                    <div className="inputPropertyValue">
                        <input
                            id="first"
                            onChange={this.handleChange}
                            className="inputPropertyValue"
                            name={fieldname}
                            defaultValue={propertyKey}
                        />
                    </div>
                </div>
            );
        };

        return (
            <div className="componentContainer">
                <div className="profilePageContainer">
                    <div className="profilePageContainerLeft">
                        {/*<p>Welcome, {this.props.first}</p>*/}
                            <div className="profilePicOwn">
                                <div className="profilePicCircle" style={style}>
                                    {/*<img src={pic} />*/}
                                </div>
                                <input
                                    id="inputfile"
                                    className="profileHiddenInput"
                                    type="file"
                                    name="file"
                                    onChange={this.setFile}
                                    data-multiple-caption="{count} files selected"
                                    multiple
                                />
                                <label htmlFor="inputfile">
                                    <img
                                        src="/editWhite.png"
                                        className="icons editIcon"
                                    />
                                </label>
                            </div>
                    </div>
                    <div className="profilePageContainerRight">
                        <div className="profileInfoContainer">
                            {(this.state.editorIsVisible && (
                                <div className="editingValues">
                                    {inputField("Firstname", "first", this.props.first)}
                                    {inputField("Lastname", "last",this.props.last)}
                                    {inputField("Email", "email", this.props.email)}
                                    <div className="profileInputField">
                                        <div className="inputPropertyName">
                                            {" "}
                                            Password{" "}
                                        </div>
                                        <div className="inputPropertyValue">
                                            <input
                                                id="pass"
                                                onChange={this.handleChange}
                                                className="inputPropertyValue"
                                                name="pass"
                                                placeholder="*******"
                                            />
                                        </div>
                                    </div>
                                    <div className="profileInputField">
                                        <div className="inputPropertyName">
                                            {" "}
                                            Bio{" "}
                                        </div>
                                        <div className="inputPropertyValue">
                                            <textarea
                                                id="bio"
                                                onChange={this.handleChange}
                                                className="inputPropertyValue editBioTextArea"
                                                name="bio"
                                                defaultValue={bio}
                                            />
                                        </div>
                                    </div>
                                    <div className="editButtons">
                                        <button
                                            className="subtleButton"
                                            onClick={this.saveNewInputValue}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="subtleButton"
                                            onClick={this.toggleEditor}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )) || (
                                <div className="existingValues">
                                    {existingValue("Firstname", this.props.first)}
                                    {existingValue("Lastname", this.props.last)}
                                    {existingValue("Email", this.props.email)}
                                    {existingValue("Password", "*******")}
                                    <div className="profileInputField">
                                        <div className="inputPropertyName">Bio</div>
                                        <div
                                            className="inputPropertyValue"
                                            style={{
                                                paddingBottom: 20 + "px"
                                            }}
                                        >
                                            {bio}
                                        </div>
                                    </div>
                                    <button
                                        className="subtleButton"
                                        onClick={this.toggleEditor}
                                    >
                                        Edit
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <button className="deleteAccountButton" onClick={()=>{
                        this.showDeleteAccountNotification();
                    }}>
                    Delete Account
                    </button>
                    {this.state.deleteAccountNotificationWindowIsVisible&&(
                        <div className="deleteAccountWindow">
                            <div className="deleteAccountWindowPopUp">
                            Are you sure you want to delete your account?

                            <button className="removingAccountButtonYES" onClick={()=>{
                                axios.get('deleteUserAccount')
                                .then(response=>{
                                    location.replace('/welcome');
                                })
                            }}> yes, I want to delete my account and all my pins </button>
                            <button className="removingAccountButtonNO" onClick={()=>{
                                console.log('lalal');
                                this.setState({
                                    deleteAccountNotificationWindowIsVisible:false
                                })
                            }}> Cancel </button>

                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
