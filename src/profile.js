import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "axios";
import { Logo, Login } from "./welcome";
import { EditBio, ExistingBio } from "./bio";

export class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.pic = this.props.profilePic;
        this.toggleBioEditor = this.toggleBioEditor.bind(this);
        this.submitNewBioButton = this.submitNewBioButton.bind(this);
        this.editBioButton = this.editBioButton.bind(this);
        this.changeBio = this.changeBio.bind(this);
        this.toggleEditor = this.toggleEditor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveNewInputValue = this.saveNewInputValue.bind(this);

        // this.changeInputValues = this.changeInputValues.bind(this);
    }

    componentDidMount(){
        console.log('mounted!');
        console.log('this.props', this.props);
        console.log('this.state', this.state);
    }
    toggleEditor() {
        console.log('toggleEditor:');
        console.log('this.props', this.props);
        console.log('this.state', this.state);
        this.setState({
            editorIsVisible: !this.state.editorIsVisible
        });
    }

    toggleBioEditor() {
        this.setState({
            editBioIsVisible: !this.state.editBioIsVisible
        });
    }
    submitNewBioButton() {
        this.setState({
            editBioIsVisible: !this.state.editBioIsVisible
        });
    }
    editBioButton() {
        this.setState({
            editBioIsVisible: !this.state.editBioIsVisible
        });
    }
    changeBio(newBio) {
        this.setState({
            bio: newBio
        });
    }

    // changeInputValues(inputValues) {
    //     console.log('mpainei');
    //     this.props.changeInputValues(inputValues);
    // }
    inputField(inputValue, state){
        console.log('lalala',name);
        return(<div>I wonder...</div>)
    }

    handleChange(e){
        this[e.target.name]=e.target.value;
    }

    saveNewInputValue(){
        let inputName = this.first||this.lastname;
        console.log("this!!",this);
        axios.post(`/updateUserInfo/`,{
            first:this.first,
            last:this.lastname,
            email:this.email,
            bio: this.bio,
            pass: this.pass
        })
        .then(response=>{
            if(response.data.user){
                console.log("response.data.user",response.data.user);
                // let {id , first, last, email, bio} = response.data.user;
                // console.log('id , first, last, email, bio',id , first, last, email, bio);
                // this.setState({
                //     id,
                //     first,
                //     last,
                //     email,
                //     bio
                // })
                console.log('props..',this.props);
                this.props.changeInputValues(response.data.user)
                // this.changeInputValues(response.data.user);
                setTimeout(this.toggleEditor,300);
            }else{
                console.log('response.data in register error ',response.data.errorMsg);
            }
        }).catch(err=>{console.log('PROBLEM :(',err);})
    }
    render() {
        let pic = this.props.profilePic || "/neo.png";
        let bio = this.props.bio || "Tell us something about urself!";

        console.log("this.state.editorIsVisible",this.state.editorIsVisible);

        return (
            <div className="editProfileContainer">
                <div className="editProfileContainerLeft">
                    <div className="pictureContainerOwn">
                    <p>Welcome, {this.props.first}</p>
                        <div className="profilePicOwn">
                            <img src={pic} />
                        </div>
                    </div>
                </div>
                <div className="editProfileContainerRight">

                    <div className="profileInfoContainer">
                        <div className="profileInfoBox">
                            {this.state.editorIsVisible
                            &&(<div className="editingValues">
                                    <div className="profileInputField">
                                        <div className="inputPropertyName">
                                        Firstname
                                        </div>
                                        <div className="inputPropertyValue">
                                            <input id="first" onChange={this.handleChange} className="inputField" name="first" placeholder={this.props.first}/>
                                        </div>
                                    </div>
                                    <div className="profileInputField">
                                        <div className="inputPropertyName">
                                        Lastname
                                        </div>
                                        <div className="inputPropertyValue">
                                            <input id="lastname" onChange={this.handleChange} className="inputField" name="lastname" placeholder={this.props.last}/>
                                        </div>
                                    </div>
                                    <div className="profileInputField">
                                        <div className="inputPropertyName">
                                        Email
                                        </div>
                                        <div className="inputPropertyValue">
                                            <input id="email" onChange={this.handleChange} className="inputField" name="email" placeholder={this.props.email}/>
                                        </div>
                                    </div>
                                    <div className="profileInputField">
                                        <div className="inputPropertyName">
                                        Password
                                        </div>
                                        <div className="inputPropertyValue">
                                            <input id="pass" onChange={this.handleChange} className="inputField" name="pass" placeholder="*******"/>
                                        </div>
                                    </div>
                                    <div className="profileInputField">
                                        <div className="inputPropertyName">
                                        Bio
                                        </div>
                                        <div className="inputPropertyValue">
                                            <textarea id="bio" onChange={this.handleChange} className="inputField editBioTextArea" name="bio" placeholder={bio}/>
                                        </div>
                                    </div>
                                </div>
                            )
                            ||(<div className="existingValues">
                                    <div className="profileInputField">
                                        <div className="inputPropertyName">
                                        Firstname
                                        </div>
                                        <div className="inputPropertyValue">
                                            {this.props.first}
                                        </div>
                                    </div>
                                    <div className="profileInputField">
                                        <div className="inputPropertyName">
                                        Lastname
                                        </div>
                                        <div className="inputPropertyValue">
                                            {this.props.last}
                                        </div>
                                    </div>
                                    <div className="profileInputField">
                                        <div className="inputPropertyName">
                                        Email
                                        </div>
                                        <div className="inputPropertyValue">
                                            {this.props.email}
                                        </div>
                                    </div>
                                    <div className="profileInputField">
                                        <div className="inputPropertyName">
                                        Password
                                        </div>
                                        <div className="inputPropertyValue">
                                        ********
                                        </div>
                                    </div>
                                    <div className="profileInputField">
                                        <div className="inputPropertyName">
                                        Bio
                                        </div>
                                        <div className="inputPropertyValue bioDisplayTextArea">
                                            {bio}
                                        </div>
                                    </div>
                                </div>
                            )
                            }

                        </div>
                        <div className="profileInfoButtons">
                            {this.state.editorIsVisible
                            &&(
                            <div className="editButtons">
                                <button className="editInfoButton subtleButton"  onClick={this.saveNewInputValue}>Save</button>
                                <button className="editInfoButton subtleButton"  onClick={this.toggleEditor}>Cancel</button>
                            </div>
                            )||
                            <button className="editInfoButton subtleButton" onClick={this.toggleEditor}>EDIT</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export function ProfilePic(props) {
    let pic = props.profilePic;
    function toggleUploader() {
        props.toggleUploader();
    }
    if (!pic) {
        pic = "/neo.png";
    }
    return <img src={pic} className="userImage" onClick={toggleUploader} />;
}

export function UploadProfilePic(props) {
    console.log("props in upload Profile pic", props);
    let pic = props.profilePic;
    let file;

    function getFile(e) {
        file = e.target.files[0];
    }
    function upload() {
        var formData = new FormData();
        var app = this;
        formData.append("file", file);
        axios.post("/updateProfilePic", formData).then(response => {
            console.log("response: ", response);
            if (response.data.success) {
                props.changeImage(response.data.imageUrl);
                console.log("response.data", response.data);
                props.toggleUploader();
            }
        });
    }
    function closePopUp() {
        props.hideUploader();
        props.toggleUploader();
    }
    if (!pic) {
        pic = "/neo.png";
    }
    return (
        <div className="uploader">
            <div className="centerText"> Change profile picture </div>
            <input type="file" className="inputButton" onChange={getFile} />
            <button type="button" onClick={upload}>
                {" "}
                Upload{" "}
            </button>
            <button type="button" onClick={closePopUp}>
                {" "}
                Cancel{" "}
            </button>
        </div>
    );
}
