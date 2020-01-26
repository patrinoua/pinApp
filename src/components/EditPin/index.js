import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from '../../axios'
import { deletePin } from '../../actions'
import { updatePinInfo } from '../../actions'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { ModalContainer, XIcon, Textarea } from '../elements.js'
import styled from 'styled-components'
import { BlackVailPinClick } from '../AddNewPin/elements.js'
import { DeletePinAlert } from '../PinClick/ButtonsAndAlerts'
import { PinTitle, PinTitleText } from '../PinClick/elements.js'

const EditPinFieldsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 20;
  width: 70vw;
  height: 70vh;
  max-width: 500px;
  max-height: 500px;
  background: white;
  border-radius: 2px;
  box-shadow: 1px 1px 11px -4px lightgrey;

  @media (max-width: 400px) {
    width: 100%;
    height: 100%;
    position: absolute;
    border: none;
    max-width: 600px;
    max-height: 100%;
  }
`

export default class EditPin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: null,
      lng: null,
      holder: null,
      ready: null,
      removeButtonText: 'X',
      editMode: false,
      title: '',
      url: '',
      deleteAlertIsVisible: false,
      pinUrl: null
    }
    this.setFile = this.setFile.bind(this)
    this.compileData = this.compileData.bind(this)
    this.toggleEditMode = this.toggleEditMode.bind(this)
    this.insertPinInfo = this.insertPinInfo.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.deletePinAlert = this.deletePinAlert.bind(this)
    this.togglePinClick = this.togglePinClick.bind(this)
    this.exportPin = this.exportPin.bind(this)
    this.toggleDeleteAlert = this.toggleDeleteAlert.bind(this)
    this.togglePinUrl = this.togglePinUrl.bind(this)
  }

  togglePinClick() {
    this.props.togglePinClick()
  }
  toggleDeleteAlert() {
    this.setState({
      deleteAlertIsVisible: !this.state.deleteAlertIsVisible
    })
  }
  togglePinUrl(pinUrl) {
    this.setState({
      pinUrl: pinUrl
    })
  }
  toggleEditMode(e) {
    this.setState({
      editMode: !this.state.editMode
    })
  }
  setFile(e) {
    this.setState({
      file: e.target.files[0]
    })
  }
  handleChange(e) {
    this[e.target.name] = e.target.value
  }
  checkValue(e) {
    this.category = e.target.name
    this.setState({
      holder: e.target.name
    })
  }
  insertPinInfo(e) {
    let pinInfo = {
      description: this.description,
      title: this.title,
      pinId: this.props.pinId
    }
    const formData = new FormData()
    formData.append('file', this.state.file)
    if (this.state.file) {
      this.props.dispatch(updatePinInfo({ formData, pinInfo }))
      this.toggleEditMode()
    } else {
      this.props.dispatch(updatePinInfo({ pinInfo }))
      this.toggleEditMode()
    }
  }
  compileData(e) {
    this.setState(
      {
        file: e.target.files[0]
      },
      () => {
        try {
          let selectedImg = new FileReader()
          selectedImg.readAsDataURL(this.state.file)
          selectedImg.addEventListener('load', () => {
            this.setState({ dataUrl: selectedImg.result })
          })
        } catch (err) {
          console.log(`error in compileData: ${err}`)
        }
      }
    )
  }
  deletePinAlert() {
    this.toggleDeleteAlert()
    if (this.state.deleteAlertIsVisible === true) {
      this.props.dispatch(deletePin(this.props.pinId))
      this.setState({
        deleteAlertIsVisible: false
      })
      this.togglePinClick()
    }
    // onClick={this.toggleEditMode}
  }
  exportPin() {
    const encryptedPinId = window.btoa(this.props.pinId)
    // const pinUrl = `localhost:8080/sharedpin/${encryptedPinId}`;
    const pinUrl = `https://pinapp-spiced.herokuapp.com/sharedpin/${encryptedPinId}`
    this.togglePinUrl(pinUrl)
    //copy to clipboard:
    var dummy = document.createElement('textarea')
    document.body.appendChild(dummy)
    dummy.value = pinUrl
    dummy.select()
    document.execCommand('copy')
    document.body.removeChild(dummy)
  }
  render() {
    // const { pinId, markersArray, flag, id } = this.props
    // const { editMode, pinUrl } = this.state

    return (
      <ModalContainer>
        <BlackVailPinClick onClick={this.togglePinClick} />
        <EditPinFieldsContainer>
          <XIcon onClick={this.togglePinClick}>X</XIcon>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <PinTitle>
              {/* <img src={bigPin} alt={'pinIcon'} /> */}
              <PinTitleText>clicked pin!</PinTitleText>
            </PinTitle>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {1 ? (
              <div
                style={{
                  width: '170px',
                  height: '170px',
                  borderRadius: '50%',
                  background: 'lightgrey',
                  zIndex: 30
                }}
              ></div>
            ) : (
              <div className='boxPinClick'>
                {(0 && (
                  <div className='galleryItemsContainer'>
                    <input
                      id='inputfile'
                      className='inputfile'
                      type='file'
                      name='file'
                      onChange={e => {
                        this.setFile(e)
                        this.compileData(e)
                      }}
                      data-multiple-caption='{count} files selected'
                      multiple
                    />
                    <label htmlFor='inputfile'>
                      {(this.state.dataUrl && (
                        <img
                          src={this.state.dataUrl}
                          className='uploadedImagePinclick'
                          alt='uploadedImagePinclick'
                        />
                      )) || (
                        <div className='cameraIconContainerPinClick'>
                          <img
                            alt='cameraIcon'
                            src='/pins/camera.png'
                            className='cameraIcon'
                          />
                        </div>
                      )}
                    </label>
                  </div>
                )) || (
                  //if there is an image.. show it (probably!)
                  <div
                    className='galleryItemsContainer'
                    style={
                      {
                        // backgroundImage: `url(${imageUrl})`
                      }
                    }
                  />
                )}
              </div>
            )}
          </div>
          {/* *******************THIRD ROW**********************/}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <div className='colPinClick'>
              <div className='textFieldsPinClick'>
                <Textarea
                  placeholder={'Title'}
                  type='text'
                  name='title'
                  rows='1'
                  onChange={this.handleChange}
                />
                <Textarea
                  placeholder={'Description'}
                  type='text'
                  name='description'
                  onChange={this.handleChange}
                  rows='1'
                />
              </div>
            </div>
          </div>
          {/* *************************FOURTH ROW********************* */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className='saveButton' onClick={this.insertPinInfo}>
              Save
            </div>
            <div className='saveButton' onClick={this.toggleEditMode}>
              Cancel
            </div>
            {this.state.deleteAlertIsVisible && (
              <DeletePinAlert
                toggleDeleteAlert={this.toggleDeleteAlert}
                deletePinAlert={this.deletePinAlert}
              />
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              className='subtleButton'
              onClick={this.deletePinAlert}
              style={{ width: '80px' }}
            >
              Unpin
            </button>
          </div>
        </EditPinFieldsContainer>
      </ModalContainer>
    )
  }
}

// EditPin.propTypes = {
// pinId: PropTypes.number.isRequired
// pinInfo: PropTypes.string,
// lat: PropTypes.string,
// lng: PropTypes.string
// }

// const mapStateToProps = function(state) {
//   return {
//     markersArray: state.markersArray,
//     pinInfo: state.pinInfo,
//     userName: state.userName
//   }
// }
