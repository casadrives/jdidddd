import React from 'react';
import { Calendar } from 'lucide-react';

export function PerformanceChart() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    earnings: [120, 85, 150, 95, 180, 160, 140],
    rides: [8, 6, 10, 7, 12, 11, 9],
  };

  const maxEarning = Math.max(...data.earnings);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Weekly Performance</h3>
        <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
          <option>This Week</option>
          <option>Last Week</option>
          <option>Last Month</option>
        </select>
      </div>

      <div className="h-64">
        <div className="h-full flex items-end space-x-2">
          {data.labels.map((day, index) => (
            <div key={day} className="flex-1 flex flex-col items-stretch space-y-1">
              <div className="flex-1 flex flex-col justify-end space-y-1">
                <div 
                  className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                  style={{ height: `${(data.earnings[index] / maxEarning) * 100}%` }}
                >
                  <div className="invisible group-hover:visible text-xs text-white text-center">
                    €{data.earnings[index]}
                  </div>
                </div>
              </div>
              <div className="text-center">
                <span className="text-sm text-gray-600">{day}</span>
                <span className="block text-xs text-gray-500">{data.rides[index]} rides</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}