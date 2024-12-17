import React from 'react';
import { Activity, Car, DollarSign, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function RecentActivity() {
  const { formatAmount } = useApp();
  
  const activities = [
    {
      id: 1,
      type: 'ride',
      description: 'Completed ride to Luxembourg Airport',
      amount: 45.50,
      time: '15 minutes ago',
      icon: Car,
    },
    {
      id: 2,
      type: 'earning',
      description: 'Daily bonus achieved',
      amount: 25.00,
      time: '2 hours ago',
      icon: DollarSign,
    },
    {
      id: 3,
      type: 'rating',
      description: 'New 5-star rating received',
      time: '3 hours ago',
      icon: Star,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-6">
        <Activity className="h-5 w-5 text-gray-400 mr-2" />
        <h2 className="text-lg font-semibold">Recent Activity</h2>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <activity.icon className="h-5 w-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <p className="text-sm text-gray-900">{activity.description}</p>
              {activity.amount && (
                <p className="text-sm font-medium text-green-600">
                  {formatAmount(activity.amount)}
                </p>
              )}
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}