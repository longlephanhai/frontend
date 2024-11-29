import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { toast } from 'react-toastify';

const Map = ({ location }) => {
  const [position, setPosition] = useState([16.0544, 108.2022]);
  useEffect(() => {
    if (location.length > 0) {
      setPosition([parseFloat(location[0]), parseFloat(location[1])]);
    } 
  }, [location]);
  console.log("location", location);
  
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });

  return (
    <MapContainer
      key={position.join(',')}
      center={position}
      zoom={28}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          Vị trí của bạn {position[0]}, {position[1]}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
