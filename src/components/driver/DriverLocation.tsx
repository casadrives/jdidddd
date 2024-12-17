import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { LocationMap } from '../LocationMap';
import { useGeolocation } from '../../hooks/useGeolocation';
import { LocationPermissionRequest } from '../LocationPermissionRequest';
import { LocationIndicator } from '../LocationIndicator';

export function DriverLocation() {
  const { location, error, isLoading } = useGeolocation();

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
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Current Location</h2>
          <LocationIndicator 
            isLoading={isLoading}
            error={error}
            location={location}
          />
        </div>

        {location && (
          <>
            <div className="h-[400px] mb-4">
              <LocationMap
                className="h-full"
                center={[location.longitude, location.latitude]}
                markers={[
                  {
                    coordinates: [location.longitude, location.latitude],
                    type: 'driver'
                  }
                ]}
              />
            </div>

            <button
              onClick={() => window.open(`https://maps.google.com/?q=${location.latitude},${location.longitude}`)}
              className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Navigation className="h-5 w-5 mr-2" />
              Open in Maps
            </button>
          </>
        )}
      </div>
    </div>
  );
}