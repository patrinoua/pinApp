import React from 'react'
import axios from '../../axios'
import { ComponentContainer, SubtleButton } from '../../elements'
import {
  ProfilePageContainer,
  ProfilePageContainerLeft,
  ProfilePageContainerRight,
  DeleteAccountButton,
  ProfilePictureContainer,
  ProfilePictureCircle,
  InputFieldContainer,
  FieldsContainer,
  FieldName,
  FieldValue,
  StyledInput,
  EditButtonsContainer,
  StyledTextarea,
  HiddenInput,
  EditProfilePictureIcon
} from './elements'
import DeleteAccount from './components/DeleteAccount'

export class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorIsVisible: false,
      deleteAccountWindowIsVisible: false
    }
    this.pic = this.props.profilepic
    this.bio = this.props.bio
    this.toggleEditor = this.toggleEditor.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.saveNewInputValue = this.saveNewInputValue.bind(this)
    this.setFile = this.setFile.bind(this)
    this.toggleDeleteProfile = this.toggleDeleteProfile.bind(this)
  }
  toggleDeleteProfile() {
    this.setState({
      deleteAccountWindowIsVisible: !this.state.deleteAccountWindowIsVisible
    })
  }
  toggleEditor() {
    this.setState({
      editorIsVisible: !this.state.editorIsVisible
    })
  }

  inputField(inputValue, state) {
    return <div>I wonder...</div>
  }
  changeInputValues(inputValues) {
    this.props.changeInputValues(inputValues)
  }
  handleChange(e) {
    this[e.target.name] = e.target.value
  }
  saveNewInputValue() {
    axios
      .post(`/updateUserInfo/`, {
        first: this.first,
        last: this.last,
        email: this.email,
        bio: this.bio,
        pass: this.pass
      })
      .then(response => {
        if (response.data.user) {
          this.props.changeInputValues(response.data.user)
          setTimeout(this.toggleEditor, 300)
        } else {
          console.log(
            'response.data in register error ',
            response.data.errorMsg
          )
        }
      })
      .catch(err => {
        console.log('PROBLEM :(', err)
      })
  }
  setFile(e) {
    this.file = e.target.files[0]
    var formData = new FormData()

    formData.append('file', this.file)
    axios
      .post('/updateProfilepic', formData)
      .then(response => {
        if (response.data.success) {
          this.props.changeImage(response.data.profilepic)
        }
      })
      .catch(err => {
        console.log(`error in updateProfilepic ${err}`)
      })
  }
  render() {
    let pic = this.props.profilepic || '/user.png'
    let bio = this.props.bio || 'Tell us something about yourself!'

    const existingField = (textToShow, propertyKey) => (
      <InputFieldContainer>
        <FieldName>{textToShow}</FieldName>
        <FieldValue>{propertyKey}</FieldValue>
      </InputFieldContainer>
    )
    const editingInputField = (textToShow, fieldname, propertyKey) => (
      <InputFieldContainer>
        <FieldName>{textToShow}</FieldName>
        <FieldValue>
          <StyledInput
            onChange={this.handleChange}
            name={fieldname}
            defaultValue={propertyKey}
          />
        </FieldValue>
      </InputFieldContainer>
    )
    const { first, last, email } = this.props
    return (
      <ComponentContainer>
        <ProfilePageContainer>
          <ProfilePageContainerLeft>
            <ProfilePictureContainer>
              <ProfilePictureCircle
                style={{
                  backgroundImage: `url(${pic})`
                }}
              />
              <HiddenInput
                id="inputfile"
                type="file"
                name="file"
                onChange={this.setFile}
                data-multiple-caption="{count} files selected"
                multiple
              />
              <label htmlFor="inputfile">
                <EditProfilePictureIcon src="/editWhite.png" alt="editWhite" />
              </label>
            </ProfilePictureContainer>
          </ProfilePageContainerLeft>
          <ProfilePageContainerRight>
            <React.Fragment>
              {(this.state.editorIsVisible && (
                <FieldsContainer>
                  {editingInputField('Firstname', 'first', first)}
                  {editingInputField('Lastname', 'last', last)}
                  {editingInputField('Email', 'email', email)}
                  <InputFieldContainer>
                    <FieldName> Password </FieldName>
                    <FieldValue>
                      <StyledInput
                        id="pass"
                        onChange={this.handleChange}
                        name="pass"
                        placeholder="*******"
                      />
                    </FieldValue>
                  </InputFieldContainer>
                  <InputFieldContainer>
                    <FieldName> Bio </FieldName>
                    <FieldValue>
                      <StyledTextarea
                        id="bio"
                        onChange={this.handleChange}
                        name="bio"
                        defaultValue={bio}
                      />
                    </FieldValue>
                  </InputFieldContainer>
                  <EditButtonsContainer>
                    <SubtleButton onClick={this.saveNewInputValue}>
                      Save
                    </SubtleButton>
                    <SubtleButton onClick={this.toggleEditor}>
                      Cancel
                    </SubtleButton>
                  </EditButtonsContainer>
                </FieldsContainer>
              )) || (
                <FieldsContainer>
                  {existingField('Firstname', first)}
                  {existingField('Lastname', last)}
                  {existingField('Email', email)}
                  {existingField('Password', '*******')}
                  <InputFieldContainer>
                    <FieldName>Bio</FieldName>
                    <FieldValue
                      style={{
                        paddingBottom: 20 + 'px'
                      }}
                    >
                      {bio}
                    </FieldValue>
                  </InputFieldContainer>
                  <SubtleButton onClick={this.toggleEditor}>Edit</SubtleButton>
                </FieldsContainer>
              )}
            </React.Fragment>
          </ProfilePageContainerRight>
          <DeleteAccountButton
            onClick={() => {
              this.toggleDeleteProfile()
            }}
          >
            Delete Account
          </DeleteAccountButton>*/}
          {this.state.deleteAccountWindowIsVisible && (
            <DeleteAccount toggleDeleteProfile={this.toggleDeleteProfile} />
          )}
        </ProfilePageContainer>
      </ComponentContainer>
    )
  }
}
