import React, { useState } from 'react';
import { MapPin, Navigation, Clock, User, Search } from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';
import { LocationPermissionRequest } from './LocationPermissionRequest';
import { LocationIndicator } from './LocationIndicator';
import { AddressInput } from './AddressInput';

interface Location {
  name: string;
  coordinates: [number, number];
}

export function BookRide() {
  const [pickup, setPickup] = useState<Location | null>(null);
  const [dropoff, setDropoff] = useState<Location | null>(null);
  const { location, error, isLoading } = useGeolocation();

  const handleUseCurrentLocation = async () => {
    if (location) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.longitude},${location.latitude}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`
        );
        const data = await response.json();
        const address = data.features[0];
        if (address) {
          setPickup({
            name: address.place_name,
            coordinates: address.center
          });
        }
      } catch (error) {
        console.error('Error getting address:', error);
      }
    }
  };

  if (!location && !error) {
    return (
      <LocationPermissionRequest 
        onRequestPermission={() => {
          navigator.geolocation.getCurrentPosition(() => {});
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <LocationIndicator 
          isLoading={isLoading}
          error={error}
          location={location}
        />

        <div className="space-y-4 mt-4">
          <AddressInput
            label="Pickup Location"
            value={pickup?.name || ''}
            onChange={() => {}} // Handled by onSelect
            onSelect={setPickup}
            icon={<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />}
            placeholder="Enter pickup location"
            useCurrentLocation
            onUseCurrentLocation={handleUseCurrentLocation}
          />

          <AddressInput
            label="Dropoff Location"
            value={dropoff?.name || ''}
            onChange={() => {}} // Handled by onSelect
            onSelect={setDropoff}
            icon={<MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 h-5 w-5" />}
            placeholder="Enter destination"
          />

          <button
            disabled={!pickup || !dropoff}
            className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Search className="h-5 w-5 mr-2" />
            Find Drivers
          </button>
        </div>
      </div>
    </div>
  );
}