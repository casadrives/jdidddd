import React from 'react';
import { Calendar, DollarSign, Download } from 'lucide-react';

interface CommissionPayment {
  id: string;
  amount: number;
  date: string;
  status: 'paid' | 'pending' | 'failed';
  transactionId: string;
  period: {
    start: string;
    end: string;
  };
}

interface CommissionHistoryProps {
  payments: CommissionPayment[];
  onDownloadReceipt: (paymentId: string) => void;
}

export function CommissionHistory({ payments, onDownloadReceipt }: CommissionHistoryProps) {
  const getStatusColor = (status: CommissionPayment['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold">Payment History</h3>
      </div>

      <div className="divide-y divide-gray-200">
        {payments.map((payment) => (
          <div key={payment.id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">
                    {new Date(payment.period.start).toLocaleDateString()} - {new Date(payment.period.end).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Transaction ID: {payment.transactionId}
                </p>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                  <span className="text-lg font-semibold">
                    €{payment.amount.toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => onDownloadReceipt(payment.id)}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 flex items-center"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download Receipt
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}