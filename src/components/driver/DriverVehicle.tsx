import React, { useState } from 'react';
import { Car, Wrench, AlertTriangle, Check } from 'lucide-react';
import { VehicleDetails } from './vehicle/VehicleDetails';
import { VehicleInspections } from './vehicle/VehicleInspections';
import { VehicleIssueReport } from './vehicle/VehicleIssueReport';

export function DriverVehicle() {
  const [vehicle] = useState({
    make: 'Mercedes-Benz',
    model: 'S-Class',
    year: 2024,
    licensePlate: 'LUX 1234',
    class: 'First Class',
    status: 'active',
    lastMaintenance: '2024-03-01',
    nextMaintenance: '2024-04-01',
    mileage: 15000,
  });

  const [showIssueReport, setShowIssueReport] = useState(false);

  return (
    <div className="space-y-6">
      <VehicleDetails vehicle={vehicle} />
      <VehicleInspections />
      
      {/* Report Issue Button */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <button
          onClick={() => setShowIssueReport(true)}
          className="w-full bg-red-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
        >
          <Wrench className="h-5 w-5 mr-2" />
          Report Vehicle Issue
        </button>
      </div>

      {showIssueReport && (
        <VehicleIssueReport
          onClose={() => setShowIssueReport(false)}
          onSubmit={async (data) => {
            console.log('Submitting issue:', data);
            setShowIssueReport(false);
          }}
        />
      )}
    </div>
  );
}