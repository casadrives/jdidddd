import React, { useState } from 'react';
import { MapPin, Navigation, Clock, Calendar, Plane, Car, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useGeolocation } from '../../hooks/useGeolocation';

interface AirportTransferProps {
  onBack?: () => void;
}

export function AirportTransfer({ onBack }: AirportTransferProps) {
  const [direction, setDirection] = useState<'to' | 'from'>('to');
  const [location, setLocation] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [vehicleClass, setVehicleClass] = useState('business');
  const { formatAmount } = useApp();
  const { location: userLocation } = useGeolocation();

  const handleUseCurrentLocation = async () => {
    if (userLocation) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${userLocation.longitude},${userLocation.latitude}.json?access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`
        );
        const data = await response.json();
        const address = data.features[0]?.place_name;
        if (address) {
          setLocation(address);
        }
      } catch (error) {
        console.error('Error getting address:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle airport transfer booking submission
    console.log('Airport transfer:', { direction, location, flightNumber, date, time, vehicleClass });
  };

  // Calculate minimum date (today) and time
  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toTimeString().slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Airport Transfer</h2>
        {onBack && (
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900"
          >
            Back
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transfer Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setDirection('to')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  direction === 'to'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <Plane className="h-6 w-6 mb-2 mx-auto text-blue-600" />
                <p className="font-medium">To Airport</p>
                <p className="text-sm text-gray-500">Departure transfer</p>
              </button>
              <button
                type="button"
                onClick={() => setDirection('from')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  direction === 'from'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <Plane className="h-6 w-6 mb-2 mx-auto text-blue-600 transform rotate-45" />
                <p className="font-medium">From Airport</p>
                <p className="text-sm text-gray-500">Arrival transfer</p>
              </button>
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {direction === 'to' ? 'Pickup Location' : 'Dropoff Location'}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg"
                placeholder={`Enter ${direction === 'to' ? 'pickup' : 'dropoff'} location`}
              />
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600"
              >
                <Navigation className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Flight Number
            </label>
            <div className="relative">
              <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter flight number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={today}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                min={date === today ? now : undefined}
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Class
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setVehicleClass('business')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  vehicleClass === 'business'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <Car className="h-6 w-6 mb-2 mx-auto text-blue-600" />
                <p className="font-medium">Business</p>
                <p className="text-sm text-gray-500">Premium comfort</p>
              </button>
              <button
                type="button"
                onClick={() => setVehicleClass('first')}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  vehicleClass === 'first'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
              >
                <Car className="h-6 w-6 mb-2 mx-auto text-blue-600" />
                <p className="font-medium">First Class</p>
                <p className="text-sm text-gray-500">Ultimate luxury</p>
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <Plane className="h-5 w-5 mr-2" />
          Book Airport Transfer
        </button>
      </form>
    </div>
  );
}