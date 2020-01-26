import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from '../../axios'
import { deletePin } from '../../actions'
import { updatePinInfo } from '../../actions'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { ModalContainer, XIcon, Textarea } from '../elements.js'
import {
  TitleAndDescription,
  BlackVailPinClick
} from '../AddNewPin/elements.js'
import { DeletePinAlert, ShareButton, EditButton } from './ButtonsAndAlerts'
import {
  PinClickFieldsContainer,
  PinTitle,
  PinTitleText,
  PinClickRow,
  PinClickSecondRow
} from './elements.js'
import EditPin from '../EditPin'
class PinClick extends React.Component {
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
  componentDidMount() {
    axios
      .post('/PinClick', {
        pinId:
          this.props.pinId ||
          window.atob(this.props.match.params.encryptedPinId)
      })
      .then(response => {
        const {
          title,
          category,
          color,
          url,
          description,
          created_at,
          user_id,
          lat,
          lng
        } = response.data.pinInfo
        this.setState({
          title,
          category,
          color,
          url: url || color || '/pins/greyPin.png',
          description,
          created_at,
          userId: user_id,
          lat,
          lng,
          ready: true
        })
      })
      .catch(err => {
        console.log(`error in PinClick componentDidMount: ${err}`)
      })
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
    const { pinId, markersArray, flag, id } = this.props
    const { editMode, pinUrl } = this.state
    if (!this.state.ready && !markersArray.length > 0) {
      return <div>not ready</div>
    } else {
      let currentPinInfo = []
      let userCanEdit = this.state.userId === id

      if (pinId) {
        currentPinInfo = markersArray.filter(item => {
          return item.id === pinId
        })
      } else if (flag) {
        const { title, category, color, url, lat, lng } = this.state
        currentPinInfo.push({
          title,
          url,
          lat,
          lng,
          category,
          color
        })
      } else {
        currentPinInfo = [this.state]
      }
      let imageUrl
      if (currentPinInfo[0].url || currentPinInfo[0].color) {
        imageUrl = currentPinInfo[0].url || currentPinInfo[0].color
      } else {
        imageUrl = '/pins/greyPin.png'
      }
      let bigPin
      if (currentPinInfo[0]) {
        bigPin = currentPinInfo[0].color || '/pins/bigPin.png'
      } else {
        bigPin = '/pins/bigPin.png'
      }
      return (
        <ModalContainer>
          <BlackVailPinClick onClick={this.togglePinClick} />
          <PinClickFieldsContainer>
            <XIcon onClick={this.togglePinClick}>X</XIcon>
            <PinTitle>
              <img src={bigPin} alt={'pinIcon'} />
              <PinTitleText>
                {currentPinInfo[0].title || 'clicked pin!'}
              </PinTitleText>
            </PinTitle>
            <PinClickSecondRow>
              <div className='boxPinClick'>
                <Map
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                  center={{
                    lat: this.props.lat || this.state.lat || 52.4918854,
                    lng: this.props.lng || this.state.lng || 13.360088699999999
                  }}
                  zoom={14}
                  google={this.props.google}
                  onReady={this.fetchPlaces}
                  visible={true}
                >
                  {this.props.markersArray &&
                    currentPinInfo.map(item => {
                      const { id, lat, lng, color } = item
                      return (
                        <Marker
                          key={lat}
                          onClick={this.pinClick}
                          name={id}
                          position={{
                            lat,
                            lng
                          }}
                          icon={{
                            url: color,
                            anchor: new google.maps.Point(15, 35),
                            scaledSize: new google.maps.Size(25, 35)
                          }}
                        />
                      )
                    })}
                </Map>
              </div>
              <div className='boxPinClick'>
                {(editMode && (
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
                  <div
                    className='galleryItemsContainer'
                    style={{
                      backgroundImage: `url(${imageUrl})`
                    }}
                  />
                )}
              </div>
            </PinClickSecondRow>
            {/* *******************THIRD ROW**********************/}
            {(editMode && (
              <PinClickRow>
                <div className='colPinClick'>
                  <div className='textFieldsPinClick'>
                    <Textarea
                      placeholder={currentPinInfo[0].title || 'Title'}
                      type='text'
                      name='title'
                      rows='1'
                      onChange={this.handleChange}
                    />
                    <Textarea
                      placeholder={
                        currentPinInfo[0].description || 'Description'
                      }
                      type='text'
                      name='description'
                      onChange={this.handleChange}
                      rows='1'
                    />
                  </div>
                  <button
                    className='subtleButton'
                    onClick={this.deletePinAlert}
                  >
                    Unpin
                  </button>
                </div>
                <ShareButton
                  togglePinUrl={this.togglePinUrl}
                  exportPin={this.exportPin}
                  pinUrl={pinUrl}
                />
              </PinClickRow>
            )) || (
              <PinClickRow>
                <TitleAndDescription>
                  <div>{currentPinInfo[0].title || 'Title'}</div>
                  <div>{currentPinInfo[0].description || 'Description'}</div>
                </TitleAndDescription>
                <ShareButton
                  togglePinUrl={this.togglePinUrl}
                  exportPin={this.exportPin}
                  pinUrl={pinUrl}
                />
              </PinClickRow>
            )}
            {/* *************************FOURTH ROW********************* */}
            {editMode && (
              <div className='pinEditSaveButtonArea box'>
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
            )}{' '}
            {!editMode && (
              <EditButton
                userCanEdit={userCanEdit}
                toggleEditMode={this.toggleEditMode}
              />
            )}
          </PinClickFieldsContainer>
        </ModalContainer>
      )
    }
  }
}
PinClick.propTypes = {
  pinId: PropTypes.number.isRequired,
  pinInfo: PropTypes.string,
  lat: PropTypes.string,
  lng: PropTypes.string
}

const mapStateToProps = function(state) {
  return {
    markersArray: state.markersArray,
    pinInfo: state.pinInfo,
    userName: state.userName
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyAM59_tOly6RmV6eSBYguDKRMukEgQ20d4'
})(connect(mapStateToProps)(PinClick))
