import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface VehicleInspection {
  id: string;
  type: string;
  date: string;
  status: 'passed' | 'failed' | 'pending';
  notes?: string;
  nextDue?: string;
}

export function VehicleInspections() {
  const [inspections] = useState<VehicleInspection[]>([
    {
      id: '1',
      type: 'Technical Control',
      date: '2024-03-01',
      status: 'passed',
      nextDue: '2024-09-01',
    },
    {
      id: '2',
      type: 'Safety Inspection',
      date: '2024-03-01',
      status: 'passed',
      nextDue: '2024-06-01',
    },
  ]);

  const getStatusColor = (status: VehicleInspection['status']) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Inspections & Certifications</h2>
      
      <div className="space-y-4">
        {inspections.map((inspection) => (
          <div
            key={inspection.id}
            className="border rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{inspection.type}</h3>
                <p className="text-sm text-gray-500">
                  Last inspection: {new Date(inspection.date).toLocaleDateString()}
                </p>
                {inspection.nextDue && (
                  <p className="text-sm text-gray-500">
                    Next due: {new Date(inspection.nextDue).toLocaleDateString()}
                  </p>
                )}
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(inspection.status)}`}>
                {inspection.status}
              </span>
            </div>

            {inspection.notes && (
              <div className="mt-2 text-sm text-gray-600">
                <p>{inspection.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}