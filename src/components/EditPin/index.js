import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from '../../axios'
import { deletePin } from '../../actions'
import { updatePinInfo } from '../../actions'
import { ModalContainer, XIcon, Textarea } from '../elements.js'
import { BlackVailPinClick } from '../AddNewPin/elements.js'
import { DeletePinAlert } from '../PinClick/ButtonsAndAlerts'
import { PinTitle, PinTitleText } from '../PinClick/elements.js'
import {
  EditPinFieldsContainer,
  UnpinButton,
  SaveCancelButtons
} from './elements.js'

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
    const {
      id,
      title,
      category,
      url,
      description,
      color
    } = this.props.currentPinInfo[0]
    console.log('this.props.currentPinInfo', this.props.currentPinInfo)
    const bigPin = color || '/pins/bigPin.png'
    let imageUrl
    if (url || color) {
      imageUrl = url || color
    } else {
      imageUrl = '/pins/greyPin.png'
    }
    return (
      <ModalContainer>
        <BlackVailPinClick onClick={this.togglePinClick} />
        <EditPinFieldsContainer>
          <UnpinButton onClick={this.deletePinAlert}>Unpin</UnpinButton>
          <XIcon onClick={this.props.toggleEditMode}>Close X</XIcon>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '20px'
            }}
          >
            <PinTitle>
              <img src={bigPin} alt={'pinIcon'} />
              <PinTitleText>clicked pin!</PinTitleText>
            </PinTitle>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className='boxPinClick'>
              <div
                style={{
                  position: 'relative',
                  border: '2px solid lightgrey',
                  width: '170px',
                  height: '170px',
                  borderRadius: '50%',
                  zIndex: 30
                }}
              >
                {this.state.dataUrl ? (
                  // the new image the user just uploaded. this doesn't work yet
                  <img
                    src={this.state.dataUrl}
                    className='uploadedImagePinclick'
                    alt='uploadedImagePinclick'
                  />
                ) : (
                  <div
                    style={{
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center center',
                      backgroundRepeat: 'no-repeat',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%'
                    }}
                  />
                )}
                <div
                  style={{
                    position: 'absolute',
                    top: 0
                  }}
                >
                  <label htmlFor='inputfile'>
                    <div
                      style={{
                        width: '170px',
                        height: '170px',
                        borderRadius: '50%',
                        zIndex: 30,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: ' rgba(256, 256, 256, 0.4)',
                        zIndex: 50
                      }}
                    >
                      <img
                        alt='cameraIcon'
                        src='/pins/camera.png'
                        className='cameraIcon'
                      />
                    </div>
                  </label>
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
                </div>
              </div>
            </div>
          </div>
          {/* *******************THIRD ROW**********************/}
          <SaveCancelButtons>
            <Textarea
              placeholder={'Title'}
              type='text'
              name='title'
              rows='1'
              onChange={this.handleChange}
              style={{ margin: '10px' }}
            />
            <Textarea
              placeholder={'Description'}
              type='text'
              name='description'
              onChange={this.handleChange}
              rows='1'
              style={{ margin: '10px' }}
            />
          </SaveCancelButtons>

          {/* *************************FOURTH ROW********************* */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className='saveButton' onClick={this.insertPinInfo}>
              Save
            </div>
            <div className='saveButton' onClick={this.props.toggleEditMode}>
              Cancel
            </div>
            {this.state.deleteAlertIsVisible && (
              <DeletePinAlert
                toggleDeleteAlert={this.toggleDeleteAlert}
                deletePinAlert={this.deletePinAlert}
              />
            )}
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
