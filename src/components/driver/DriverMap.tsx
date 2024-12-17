import React from 'react';
import { LocationMap } from '../LocationMap';

interface DriverMapProps {
  location: { latitude: number; longitude: number } | null;
}

export function DriverMap({ location }: DriverMapProps) {
  if (!location) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Live Map</h2>
      <div className="h-[400px]">
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
    </div>
  );
}