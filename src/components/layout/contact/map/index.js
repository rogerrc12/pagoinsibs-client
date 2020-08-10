import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';

const Map = () => {
  return (
    <GoogleMap defaultZoom={18} defaultCenter={{ lat: 10.489555, lng: -66.863753 }}>
      <Marker position={{ lat: 10.489502, lng: -66.863293 }} />
    </GoogleMap>
  )
}

export default withScriptjs(withGoogleMap(Map));
