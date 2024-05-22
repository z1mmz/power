import React, { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import MarkerForm from './components/MarkerForm';
import { firestore } from './firebase';
import { ChakraProvider } from '@chakra-ui/react'
import './App.css';

function App() {
  const [markers, setMarkers] = useState([]);
  const [clickedPosition, setClickedPosition] = useState(null);

  useEffect(() => {
    const fetchMarkers = async () => {
      const markersCollection = await firestore.collection('markers').get();
      setMarkers(markersCollection.docs.map(doc => doc.data()));
    };

    fetchMarkers();
  }, []);

  const addMarker = (newMarker) => {
    setMarkers([...markers, newMarker]);
  };

  const handleMapClick = (latlng) => {
    setClickedPosition(latlng);
  };

  return (
    <ChakraProvider>
    <div className="App">
      
      <div className="container">
        <div className="Marker_container">
        <h1>Power finder</h1>
        <MarkerForm position={clickedPosition} addMarker={addMarker} />
        </div>
        <div className="map_container">      
          <MapComponent markers={markers} onMapClick={handleMapClick} />
          </div>

     
      </div>
    </div>
    </ChakraProvider>
  );
}

export default App;
