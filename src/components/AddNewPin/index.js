import React from 'react'
import { connect } from 'react-redux'
import { insertPinInfo } from '../../actions'
import { ModalContainer, BlackVail, Textarea } from '../elements'
import {
  FieldsContainerNewPin,
  PinCategory,
  PinCheckboxArea,
  PinCheckbox,
  PinIcon,
  PinText,
  PinTitleArea,
  PinTitle,
  SaveButton,
  SaveCancelArea,
  CloseModalX,
  AddPinPicture,
  CameraIconContainer,
  TitleAndDescription,
  PinOptions,
  PinMenu
} from './elements'

class AddNewPin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: null,
      lng: null,
      holder: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.setFile = this.setFile.bind(this)
    this.checkValue = this.checkValue.bind(this)
    this.insertPinInfos = this.insertPinInfos.bind(this)
    this.compileData = this.compileData.bind(this)
  }
  handleChange(e) {
    this[e.target.name] = e.target.value
  }
  setFile(e) {
    this.setState({
      file: e.target.files[0]
    })
  }
  checkValue(e) {
    this.category = e.target.name

    this.setState({
      holder: e.target.name
    })
  }
  insertPinInfos(e) {
    let pinColor = {
      museums: '/pins/bluePin.png',
      bars: '/pins/pinkPin.png',
      restaurants: '/pins/yellowPin.png',
      parks: '/pins/greenPin.png',
      sightseeing: '/pins/purplePin.png',
      general: '/pins/greyPin.png'
    }
    let cat
    if (!this.category) {
      cat = 'general'
    } else {
      cat = this.category
    }
    let pinInfo = {
      description: this.description,
      title: this.title,
      category: cat,
      lat: this.props.lat,
      lng: this.props.lng,
      color: pinColor[cat]
    }
    const formData = new FormData()
    formData.append('file', this.state.file)
    this.props.dispatch(insertPinInfo({ formData, pinInfo }))
    this.props.toggleAddNewPinComponent()
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
  render() {
    const { toggleAddNewPinComponent } = this.props
    document.addEventListener('keydown', e => {
      if (e.keyCode === 27) {
        this.props.toggleAddNewPinComponent()
      }
    })
    const category = (color, text, variable) => {
      let str = '/pins/' + color + 'Pin.png'
      return (
        <PinCategory>
          <PinCheckboxArea>
            <PinCheckbox
              src='/pins/checkboxBlack.png'
              alt='checkbox'
              name={variable}
              onClick={this.checkValue}
            />
            <PinIcon src={str} alt='pinIcon' />
            {this.state.holder === variable && (
              <img src='/pins/tick.png' className='tickIcon' alt='tickIcon' />
            )}
          </PinCheckboxArea>
          <PinText>
            <label>{text}</label>
          </PinText>
        </PinCategory>
      )
    }
    return (
      <React.Fragment>
        <ModalContainer>
          <BlackVail onClick={toggleAddNewPinComponent} />
          <FieldsContainerNewPin>
            <CloseModalX onClick={toggleAddNewPinComponent}>X</CloseModalX>
            <PinTitleArea>
              <img src='/pins/bigPin.png' alt='bigPin' />
              <PinTitle>New Pin</PinTitle>
            </PinTitleArea>
            <PinOptions>
              <PinMenu>
                <form>
                  {category('blue', 'Museum', 'museums')}
                  {category('green', 'Park', 'parks')}
                  {category('yellow', 'Restaurant', 'restaurants')}
                  {category('pink', 'Bar', 'bars')}
                  {category('purple', 'Sightseeing', 'sightseeing')}
                </form>
              </PinMenu>
              <AddPinPicture>
                {(!this.state.dataUrl && (
                  <CameraIconContainer>
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
                      <img
                        src='/pins/camera.png'
                        className='cameraIcon'
                        alt='cameraIcon'
                      />
                    </label>
                  </CameraIconContainer>
                )) || (
                  <CameraIconContainer
                    style={{
                      backgroundColor: 'black'
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${this.state.dataUrl})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        backgroundSize: 'contain',
                        zIndex: '50'
                      }}
                    />
                  </CameraIconContainer>
                )}
                <TitleAndDescription>
                  <Textarea
                    placeholder='Title'
                    type='text'
                    name='title'
                    rows='1'
                    onChange={this.handleChange}
                  />
                  <Textarea
                    placeholder='Add Description'
                    type='text'
                    name='description'
                    onChange={this.handleChange}
                    rows='3'
                  />
                </TitleAndDescription>
              </AddPinPicture>
            </PinOptions>
            <SaveCancelArea>
              <SaveButton onClick={this.insertPinInfos}>Save</SaveButton>
              <SaveButton onClick={toggleAddNewPinComponent}>Cancel</SaveButton>
            </SaveCancelArea>
          </FieldsContainerNewPin>
        </ModalContainer>
      </React.Fragment>
    )
  }
}
const mapStateToProps = function(state) {
  return {
    markersArray: state.markersArray
  }
}

export default connect(mapStateToProps)(AddNewPin)
