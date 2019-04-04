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
  DeleteAccountContainer,
  DeleteAccountWindowPopUp,
  DeletingAccountButton,
  EditProfilePictureIcon
} from './elements'

export class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorIsVisible: false,
      deleteAccountNotificationWindowIsVisible: false
    }
    this.pic = this.props.profilepic
    this.bio = this.props.bio
    this.toggleEditor = this.toggleEditor.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.saveNewInputValue = this.saveNewInputValue.bind(this)
    this.setFile = this.setFile.bind(this)
    this.showDeleteAccountNotification = this.showDeleteAccountNotification.bind(
      this
    )
  }
  showDeleteAccountNotification() {
    this.setState({
      deleteAccountNotificationWindowIsVisible: true
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

    const existingValue = (textToShow, propertyKey) => (
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
                  {existingValue('Firstname', first)}
                  {existingValue('Lastname', last)}
                  {existingValue('Email', email)}
                  {existingValue('Password', '*******')}
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
              this.showDeleteAccountNotification()
            }}
          >
            Delete Account
          </DeleteAccountButton>
          {this.state.deleteAccountNotificationWindowIsVisible && (
            <DeleteAccountContainer
              onClick={() => {
                this.setState({
                  deleteAccountNotificationWindowIsVisible: false
                })
              }}
            >
              <DeleteAccountWindowPopUp>
                Are you sure you want to delete your account?
                <DeletingAccountButton
                  onClick={() => {
                    axios.get('deleteUserAccount').then(response => {
                      location.replace('/welcome')
                    })
                  }}
                >
                  {' '}
                  yes, I want to delete my account and all my pins{' '}
                </DeletingAccountButton>
                <DeletingAccountButton
                  onClick={() => {
                    this.setState({
                      deleteAccountNotificationWindowIsVisible: false
                    })
                  }}
                >
                  {' '}
                  Cancel{' '}
                </DeletingAccountButton>
              </DeleteAccountWindowPopUp>
            </DeleteAccountContainer>
          )}
        </ProfilePageContainer>
      </ComponentContainer>
    )
  }
}
