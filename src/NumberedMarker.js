import React from 'react';
import { Marker } from '@react-google-maps/api';


const NumberedMarker = (props) => {
  console.log(props);
  return (
    <Marker 
     draggable={true}
     position={props.position}
     label={{text:`${props.number}`,color:'#fff'}}
     clusterer={props.clusterer}
     onDragEnd = {(event)=> {
      const newPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
       };
       props.handleMarkerDragEnd(newPosition, props.number)
     }}

    //  onDragEnd={(event) => {
    //   console.log("sss")
    //   const newPosition = {
    //     lat: event.latLng.lat(),
    //     lng: event.latLng.lng(),
    //   };
      // handleMarkerDragEnd(marker.id, newPosition);
    // }}
    >
   
    </Marker>


  );
};

export default NumberedMarker;
