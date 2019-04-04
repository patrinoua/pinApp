import React from 'react'
import { connect } from 'react-redux'
import PinClick from '../../components/PinClick'
import { BlackVail, XIcon } from '../elements.js'
import {
  ListOfPinsContainer,
  ListOfLocationsHolder,
  ListSmallHolder,
  ListTitle,
  EachPin,
  PinImage,
  Description,
  Date
} from './elements.js'

class ListOfPins extends React.Component {
  constructor(props) {
    super(props)
    this.state = { clickedPinId: null }
    this.closeClickedPinList = this.closeClickedPinList.bind(this)
    this.getLatAndLang = this.getLatAndLang.bind(this)
  }
  componentWillUnmount() {
    this.setState({
      clickedPinId: null
    })
  }
  closeClickedPinList() {
    this.setState({
      clickedPinId: null
    })
  }
  getLatAndLang() {
    // lat = {this.props.markersArray.filter(
    //     (pin)=>{
    //         if(pin.id==this.state.clickedPinId){
    //             console.log("pin.lat", pin.lat);
    //             return pin.lat
    //         }
    //     }
    // )}
    // lng = {this.props.markersArray.filter(
    //     (pin)=>{
    //         if(pin.id==this.state.clickedPinId){
    //             console.log("pin.lng", pin.lng);
    //             return pin.lng
    //         }
    //     }
    // )}
  }
  render() {
    return (
      <React.Fragment>
        {this.state.clickedPinId && (
          <PinClick
            pinId={this.state.clickedPinId}
            togglePinClick={this.closeClickedPinList}
            id={this.props.id}
            lat={this.state.lat}
            lng={this.state.lng}
          />
        )}
        <ListOfPinsContainer>
          <BlackVail onClick={this.props.closeListComponent} />
          <ListOfLocationsHolder>
            <ListSmallHolder>
              <XIcon onClick={this.props.closeListComponent}>X</XIcon>
              <ListTitle className="pinAppStyle">
                {this.props.first && this.props.first + "'s Pins"}
                {!this.props.first && 'my Pins'}
              </ListTitle>
              {this.props.markersArray &&
                this.props.markersArray.map(item => (
                  <EachPin
                    key={item.title + item.id}
                    onClick={() => {
                      this.setState({
                        clickedPinId: item.id,
                        lat: item.lat,
                        lng: item.lng
                      })
                      this.props.closeListComponent
                    }}
                  >
                    <PinImage
                      className="thePinImg"
                      alt="thePinImg"
                      src={item.color}
                    />
                    <span> {item.title} </span>
                    <Description> {item.description} </Description>
                    <Date>{item.created_at}</Date>
                  </EachPin>
                ))}
            </ListSmallHolder>
          </ListOfLocationsHolder>
        </ListOfPinsContainer>
      </React.Fragment>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    markersArray: state.markersArray
  }
}

export default connect(mapStateToProps)(ListOfPins)
