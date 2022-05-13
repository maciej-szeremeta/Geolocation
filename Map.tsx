import React, { useEffect, useState, } from 'react';
import { MapContainer, TileLayer, Marker, Popup, }from 'react-leaflet';
import './Map.css';

// ? Naprawa ikonki pineski
import '../../utils/fix-map-icon';

// ? Style do mapy zaimportowane z głównej paczki leaflet
import 'leaflet/dist/leaflet.css';

interface MyPosition{
  lat: number | null
  lng: number | null
}

export function Map() {

  const [ position, setPosition, ] = useState<MyPosition> ({ lat: null, lng: null, });
  
  useEffect (() => {
    function getLocation() {
      navigator.geolocation.getCurrentPosition (pos => {
        setPosition ({ lat: pos.coords.latitude, lng: pos.coords.longitude, });
      });
    }
    getLocation ();
  }, []);

  if (!position.lat || !position.lng) {
    return <div>Proszę o zgodę na ustalenie pozycji</div>;
  } 

  return (
    <div className="map">
      <MapContainer
        center={[ position.lat, position.lng, ]}
        zoom={13}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={[ position.lat, position.lng, ]}>
          <Popup>
             Moja Chata - ⌨💻🖱
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
