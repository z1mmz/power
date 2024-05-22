import React, { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import {
    Input,
    Button
  } from '@chakra-ui/react'

const MarkerForm = ({ position, addMarker }) => {
  const [newMarker, setNewMarker] = useState({ lat: '', lon: '', text: '' });

  useEffect(() => {
    if (position) {
      setNewMarker({ lat: position.lat, lon: position.lng, text: '' });
    }
  }, [position]);

  const handleChange = (e) => {
    setNewMarker({
      ...newMarker,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await firestore.collection('markers').add(newMarker);
    addMarker(newMarker);
    setNewMarker({ lat: '', lon: '', text: '' });
  };

  return (
    <div>
        <h2>Add a new location</h2>
        <form onSubmit={handleSubmit}>
        <Input
            type="text"
            name="lat"
            value={newMarker.lat}
            onChange={handleChange}
            placeholder="Latitude"
            readOnly
        />
        <Input
            type="text"
            name="lon"
            value={newMarker.lon}
            onChange={handleChange}
            placeholder="Longitude"
            readOnly
        />
        <Input
            type="text"
            name="text"
            value={newMarker.text}
            onChange={handleChange}
            placeholder="Description"
            required
        />
        <Button type="submit">Add Marker</Button>
        </form>
    </div>
  );
};

export default MarkerForm;
