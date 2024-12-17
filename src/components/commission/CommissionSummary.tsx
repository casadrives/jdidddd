import React from 'react';
import { DollarSign, Calendar, AlertTriangle } from 'lucide-react';
import { COMMISSION_CONFIG } from '../../config/commission';

interface CommissionSummaryProps {
  totalRevenue: number;
  commission: number;
  driverPayouts: number;
  dueDate?: string;
  isPastDue?: boolean;
  onPayNow?: () => void;
}

export function CommissionSummary({
  totalRevenue,
  commission,
  driverPayouts,
  dueDate,
  isPastDue,
  onPayNow,
}: CommissionSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Commission Summary</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-semibold">€{totalRevenue.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Platform Commission ({COMMISSION_CONFIG.PLATFORM_RATE * 100}%)</p>
          <p className="text-2xl font-semibold">€{commission.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Driver Payouts</p>
          <p className="text-2xl font-semibold">€{driverPayouts.toFixed(2)}</p>
        </div>
      </div>

      {dueDate && (
        <div className={`rounded-lg p-4 ${
          isPastDue ? 'bg-red-50' : 'bg-blue-50'
        }`}>
          <div className="flex items-start">
            {isPastDue ? (
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
            ) : (
              <Calendar className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
            )}
            <div>
              <p className={`font-medium ${
                isPastDue ? 'text-red-800' : 'text-blue-800'
              }`}>
                {isPastDue ? 'Payment Overdue' : 'Next Payment Due'}
              </p>
              <p className={isPastDue ? 'text-red-600' : 'text-blue-600'}>
                {new Date(dueDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          {onPayNow && (
            <button
              onClick={onPayNow}
              className={`mt-4 w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium ${
                isPastDue
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <DollarSign className="h-5 w-5 mr-2" />
              Pay Now
            </button>
          )}
        </div>
      )}
    </div>
  );
}