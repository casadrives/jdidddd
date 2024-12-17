import React from 'react';
import { Car } from 'lucide-react';

interface VehicleDetailsProps {
  vehicle: {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    class: string;
    status: string;
    lastMaintenance: string;
    nextMaintenance: string;
    mileage: number;
  };
}

export function VehicleDetails({ vehicle }: VehicleDetailsProps) {
  const isMaintenanceDue = new Date(vehicle.nextMaintenance) <= new Date();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Vehicle Information</h2>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          vehicle.status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {vehicle.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Vehicle Details</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Car className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-gray-900">{vehicle.make} {vehicle.model} ({vehicle.year})</span>
            </div>
            <p className="text-gray-600">License Plate: {vehicle.licensePlate}</p>
            <p className="text-gray-600">Class: {vehicle.class}</p>
            <p className="text-gray-600">Mileage: {vehicle.mileage.toLocaleString()} km</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Maintenance</h3>
          <div className="space-y-3">
            <p className="text-gray-600">
              Last Service: {new Date(vehicle.lastMaintenance).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              Next Service: {new Date(vehicle.nextMaintenance).toLocaleDateString()}
            </p>
            
            {isMaintenanceDue && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Maintenance is due. Please schedule service soon.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}