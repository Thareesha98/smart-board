import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { FaCrosshairs, FaMapMarkerAlt } from 'react-icons/fa';

// ✅ Use the existing ENV variable
const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '1rem'
};

const defaultCenter = {
  lat: 6.9271, // Colombo
  lng: 79.8612
};

const LocationPicker = ({ lat, lng, onLocationSelect }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script-picker',
    googleMapsApiKey: googleMapsApiKey
  });

  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(defaultCenter);

  // Sync state if editing
  useEffect(() => {
    if (lat && lng) {
      setMarkerPosition({ lat: parseFloat(lat), lng: parseFloat(lng) });
    }
  }, [lat, lng]);

  const onLoad = useCallback((map) => setMap(map), []);
  const onUnmount = useCallback(() => setMap(null), []);

  const handleLocationChange = (e) => {
    const newLat = e.latLng.lat();
    const newLng = e.latLng.lng();
    setMarkerPosition({ lat: newLat, lng: newLng });
    onLocationSelect(newLat, newLng);
  };

  const handleUseMyLocation = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMarkerPosition(pos);
          map?.panTo(pos);
          onLocationSelect(pos.lat, pos.lng);
        },
        () => alert("Error: Could not access location.")
      );
    }
  };

  if (!isLoaded) return <div className="h-96 bg-gray-100 rounded-xl animate-pulse flex items-center justify-center">Loading Map...</div>;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-xs font-black uppercase tracking-[0.2em] text-muted flex items-center gap-2">
           <FaMapMarkerAlt className="text-accent"/> Pin Location
        </label>
        <button
          onClick={handleUseMyLocation}
          className="flex items-center gap-2 text-[10px] font-bold text-accent hover:text-primary transition-colors bg-white px-3 py-2 rounded-lg border border-light shadow-sm"
        >
          <FaCrosshairs /> Use My Current Location
        </button>
      </div>

      <div className="rounded-xl overflow-hidden border-4 border-white shadow-custom relative">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={markerPosition}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={handleLocationChange}
          options={{
             streetViewControl: false,
             mapTypeControl: false,
             fullscreenControl: true,
          }}
        >
          <Marker
            position={markerPosition}
            draggable={true}
            onDragEnd={handleLocationChange}
            animation={window.google.maps.Animation.DROP}
          />
        </GoogleMap>
        
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-2 rounded-lg text-[10px] font-mono font-bold shadow-md text-text border border-light">
          {markerPosition.lat.toFixed(6)}, {markerPosition.lng.toFixed(6)}
        </div>
      </div>
      <p className="text-[10px] font-medium italic text-muted text-center">
        * Drag the red marker to the exact entrance of your boarding place.
      </p>
    </div>
  );
};

export default LocationPicker;