import React from 'react';
import { Car, DollarSign, Clock, Star } from 'lucide-react';
import { StatsGrid } from './StatsGrid';
import { RecentActivity } from './RecentActivity';
import { useApp } from '../../context/AppContext';

export function Overview() {
  const { formatAmount } = useApp();

  const stats = [
    {
      label: "Today's Rides",
      value: '8',
      icon: Car,
      colorClass: 'text-blue-500',
      change: '+12%'
    },
    {
      label: "Today's Earnings",
      value: formatAmount(145.50),
      icon: DollarSign,
      colorClass: 'text-green-500',
      change: '+15%'
    },
    {
      label: 'Online Hours',
      value: '6.5h',
      icon: Clock,
      colorClass: 'text-purple-500',
      change: '+8%'
    },
    {
      label: 'Rating',
      value: '4.9',
      icon: Star,
      colorClass: 'text-yellow-500',
      change: '0%'
    },
  ];

  return (
    <div className="space-y-6">
      <StatsGrid stats={stats} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentActivity />
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Performance Chart</h2>
          {/* Add performance chart component here */}
        </div>
      </div>
    </div>
  );
}