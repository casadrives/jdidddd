import React from 'react';
import { DollarSign, TrendingUp, Calendar, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function EarningsSummary() {
  const { formatAmount } = useApp();

  const earnings = {
    today: 145.50,
    week: 875.25,
    month: 3450.00,
    rides: 145,
    hours: 32,
    rating: 4.8,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-sm text-gray-500">Today's Earnings</span>
            </div>
            <TrendingUp className="h-5 w-5 text-green-500" />
          </div>
          <p className="mt-2 text-3xl font-bold">{formatAmount(earnings.today)}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-sm text-gray-500">This Week</span>
            </div>
          </div>
          <p className="mt-2 text-3xl font-bold">{formatAmount(earnings.week)}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="ml-2 text-sm text-gray-500">Hours Online</span>
            </div>
          </div>
          <p className="mt-2 text-3xl font-bold">{earnings.hours}h</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Earnings Breakdown</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Base Fare</span>
              <span className="font-medium">{formatAmount(earnings.week * 0.7)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Tips</span>
              <span className="font-medium">{formatAmount(earnings.week * 0.15)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Bonuses</span>
              <span className="font-medium">{formatAmount(earnings.week * 0.15)}</span>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total</span>
                <span>{formatAmount(earnings.week)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}