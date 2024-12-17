import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  colorClass: string;
  change?: string;
}

export function StatsCard({ label, value, icon: Icon, colorClass, change }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <Icon className={`h-6 w-6 ${colorClass}`} />
        {change && (
          <span className={`text-sm font-medium ${
            change.startsWith('+') ? 'text-green-600' : 
            change.startsWith('-') ? 'text-red-600' : 
            'text-gray-600'
          }`}>
            {change}
          </span>
        )}
      </div>
      <h3 className="mt-4 text-2xl font-semibold text-gray-900">{value}</h3>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}