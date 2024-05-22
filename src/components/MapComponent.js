import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for marker icons not displaying correctly
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const ClickHandler = ({ onClick }) => {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
      console.log(e.latlng);
    },
  });
  return null;
};

const MapComponent = ({ markers, onMapClick }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (err) => {
          console.error(err);
          setPosition([37.8136, 144.9631]); // Default to Melbourne if geolocation fails
        }
      );
    } else {
      setPosition([37.8136, 144.9631]); // Default to Melbourne if geolocation is not available
    }
  }, []);

  return (
    <div  classname="Map_container" >
      {position ? (
        <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              You are here!
            </Popup>
          </Marker>
          {markers.map((marker, index) => (
            <Marker key={index} position={[marker.lat, marker.lon]}>
              <Popup>{marker.text}</Popup>
            </Marker>
          ))}
          <ClickHandler onClick={onMapClick} />
        </MapContainer>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MapComponent;
