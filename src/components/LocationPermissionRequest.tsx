import React from 'react';
import { MapPin, AlertTriangle } from 'lucide-react';

interface LocationPermissionRequestProps {
  onRequestPermission: () => void;
  error?: string | null;
}

export function LocationPermissionRequest({ onRequestPermission, error }: LocationPermissionRequestProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 text-center">
      <div className="flex justify-center mb-4">
        <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
          <MapPin className="h-8 w-8 text-blue-600" />
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-2">Enable Location Services</h3>
      <p className="text-gray-600 mb-6">
        We need your location to provide accurate pickup and dropoff services.
      </p>

      {error && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
          <div className="text-sm text-red-700 text-left">
            <p className="font-medium">Location Error</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      <button
        onClick={onRequestPermission}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Enable Location
      </button>

      <p className="mt-4 text-sm text-gray-500">
        You can change this setting at any time in your browser settings.
      </p>
    </div>
  );
}