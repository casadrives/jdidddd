import React from 'react';
import { Car, MapPin, Clock, DollarSign } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function RidesSummary() {
  const { formatAmount } = useApp();
  
  const recentRides = [
    {
      id: '1',
      pickup: 'Luxembourg Airport',
      dropoff: 'City Center',
      amount: 35.50,
      duration: '25 min',
      distance: '12.5 km',
      status: 'completed',
      timestamp: '2024-03-15 14:30',
    },
    {
      id: '2',
      pickup: 'Kirchberg',
      dropoff: 'Gare Centrale',
      amount: 22.75,
      duration: '15 min',
      distance: '8.2 km',
      status: 'completed',
      timestamp: '2024-03-15 12:15',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Today's Rides</h3>
      </div>

      <div className="divide-y divide-gray-200">
        {recentRides.map((ride) => (
          <div key={ride.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-2">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-green-500 mr-2" />
                  <span>{ride.pickup}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-red-500 mr-2" />
                  <span>{ride.dropoff}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  {formatAmount(ride.amount)}
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(ride.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{ride.duration}</span>
              </div>
              <div className="flex items-center">
                <Car className="h-4 w-4 mr-1" />
                <span>{ride.distance}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                ride.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {ride.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}