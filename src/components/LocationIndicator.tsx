import React from 'react';
import { MapPin, Loader } from 'lucide-react';

interface LocationIndicatorProps {
  isLoading: boolean;
  error: string | null;
  location: { latitude: number; longitude: number } | null;
}

export function LocationIndicator({ isLoading, error, location }: LocationIndicatorProps) {
  if (isLoading) {
    return (
      <div className="flex items-center text-gray-600">
        <Loader className="h-5 w-5 animate-spin mr-2" />
        <span>Getting your location...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 flex items-center">
        <MapPin className="h-5 w-5 mr-2" />
        <span>Error: {error}</span>
      </div>
    );
  }

  if (location) {
    return (
      <div className="text-green-600 flex items-center">
        <MapPin className="h-5 w-5 mr-2" />
        <span>Location active</span>
      </div>
    );
  }

  return null;
}