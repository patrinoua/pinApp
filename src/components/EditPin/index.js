import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updatePinInfo } from '../../actions'
import { ModalContainer, XIcon, Textarea } from '../elements.js'
import { BlackVailPinClick } from '../AddNewPin/elements.js'
import { PinTitle, PinTitleText } from '../PinClick/elements.js'
import {
  EditPinFieldsContainer,
  UnpinButton,
  SaveCancelButtons
} from './elements.js'

class EditPin extends React.Component {
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
    this.insertPinInfo = this.insertPinInfo.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.exportPin = this.exportPin.bind(this)
    this.togglePinUrl = this.togglePinUrl.bind(this)
  }

  togglePinUrl(pinUrl) {
    this.setState({
      pinUrl: pinUrl
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
    } else {
      this.props.dispatch(updatePinInfo({ pinInfo }))
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
      toggleEditMode,
      togglePinClick,
      currentPinInfo,
      toggleDeleteAlert
    } = this.props
    const { url, color } = currentPinInfo
    const { dataUrl } = this.state
    const bigPin = color || '/pins/bigPin.png'
    let imageUrl
    if (url || color) {
      imageUrl = url || color
    } else {
      imageUrl = '/pins/greyPin.png'
    }
    return (
      <ModalContainer>
        <BlackVailPinClick onClick={togglePinClick} />
        <EditPinFieldsContainer>
          <UnpinButton onClick={toggleDeleteAlert}>Unpin</UnpinButton>

          <XIcon onClick={toggleEditMode}>Close X</XIcon>
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
                  width: '170px',
                  height: '170px',
                  borderRadius: '50%',
                  zIndex: 30
                }}
              >
                <div
                  style={{
                    backgroundImage: `url(${dataUrl ? dataUrl : imageUrl})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%'
                  }}
                />
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
          <SaveCancelButtons>
            <Textarea
              placeholder={'Title'}
              type='text'
              name='title'
              rows='1'
              onChange={this.handleChange}
              style={{ marginTop: '10px' }}
            />
            <Textarea
              placeholder={'Description'}
              type='text'
              name='description'
              onChange={this.handleChange}
              rows='1'
              style={{ marginTop: '10px', marginBottom: '20px' }}
            />
          </SaveCancelButtons>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              className='saveButton'
              onClick={() => {
                this.insertPinInfo()
                toggleEditMode()
              }}
            >
              Save
            </div>
            <div className='saveButton' onClick={toggleEditMode}>
              Cancel
            </div>
          </div>
        </EditPinFieldsContainer>
      </ModalContainer>
    )
  }
}

EditPin.propTypes = {
  currentPinInfo: PropTypes.object.isRequired
}

const mapStateToProps = function(state) {
  return {
    markersArray: state.markersArray,
    pinInfo: state.pinInfo,
    userName: state.userName
  }
}

export default connect(mapStateToProps)(EditPin)
