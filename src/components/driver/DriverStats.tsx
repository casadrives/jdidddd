import React from 'react';
import { Car, Clock, DollarSign, Star } from 'lucide-react';

export function DriverStats() {
  const stats = [
    {
      label: "Today's Rides",
      value: '8',
      icon: Car,
      change: '+2',
      colorClass: 'text-blue-500',
    },
    {
      label: "Today's Earnings",
      value: '€145.50',
      icon: DollarSign,
      change: '+€45.50',
      colorClass: 'text-green-500',
    },
    {
      label: 'Online Hours',
      value: '6.5h',
      icon: Clock,
      change: '+2.5h',
      colorClass: 'text-purple-500',
    },
    {
      label: 'Rating',
      value: '4.9',
      icon: Star,
      change: '+0.1',
      colorClass: 'text-yellow-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <stat.icon className={stat.colorClass} />
            <span className="text-sm font-medium text-gray-600">{stat.change}</span>
          </div>
          <h3 className="mt-4 text-2xl font-semibold text-gray-900">{stat.value}</h3>
          <p className="text-sm text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}