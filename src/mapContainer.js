import React from "react";
import ReactDOM from "react-dom";
// import { GoogleApiWrapper } from 'google-maps-react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {

    fetchPlaces(mapProps, map) {
      const {google} = mapProps;
      const service = new google.maps.places.PlacesService(map);
      // ...
    }

    render() {
      return (
        <Map google={this.props.google}
          onReady={this.fetchPlaces}
          visible={false}>
            {/*<Listing places={this.state.places} />*/}
        </Map>
      )
    }
  // render() {
  //     console.log('props & state', this.props,this.state);
  //   return (
  //
  //       <Map
  //         google={this.props.google}
  //
  //         initialCenter={{
  //           lat: 40.854885,
  //           lng: -88.081807
  //         }}
  //         zoom={15}
  //         onClick={this.onMapClicked}
  //       />
  //
  //   );
  // }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
})(MapContainer)
