import React, { useState } from 'react';
import './firebaseConfig';
import {getFirestore, addDoc, collection} from 'firebase/firestore';
import { GoogleMap, useJsApiLoader,Marker , MarkerClusterer} from '@react-google-maps/api';


const containerStyle = {
  width: '100vh',
  height: '100vh'
};

const center = {
  lat: 49.842957,
  lng: 24.031111
};

const App = () => {

  const db = getFirestore();
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCzeue89KAJdQ-z1upXd7v_dZPy80NLGh4"
  })

  const [map, setMap] = React.useState(null)

  const [markers, setMarkers] = useState([
    { id: 1, number:"1", timestamp: new Date().toLocaleTimeString(), position: { lat: 49.8397, lng: 24.3 } },
    { id: 2, number:"2", timestamp: new Date().toLocaleTimeString(), position: { lat: 49.8397, lng: 24.2 } },
    { id: 3, number:"3", timestamp: new Date().toLocaleTimeString(), position: { lat: 49.8397, lng: 24.1 } }
    
  ]);

  const handleMarkerDragEnd = async (markerId, position) => {
  
    let timestamp = new Date().toLocaleTimeString()
    const updatedMarkers = markers.map((marker) =>
      marker.id == markerId ? { ...marker, position,timestamp } : marker
      
    );
    const docRef = await addDoc(collection(db, "myCollection"), {
      id: markerId,
      Location: position,
      timestamp: timestamp
    })
  
   
    setMarkers(updatedMarkers);

  };

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
  
         <MarkerClusterer gridSize={60}>
         {(clusterer) => 
         <div>
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            draggable={true}
            position={marker.position}
            label={{text:`${marker.id}`,color:'#fff'}}
            number= {marker.number}
            clusterer={clusterer}
            onDragEnd = {(event)=> {
            
            const newPosition = {
                  lat: event.latLng.lat(),
                  lng: event.latLng.lng(),
             };
             handleMarkerDragEnd(marker.id, newPosition)
           }}
        />
          
        ))}
        </div>
      }
       </MarkerClusterer> 
      </GoogleMap>
  ) : <></>
};



export default App;
