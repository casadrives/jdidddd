import React, { useState } from 'react';
import { DollarSign, Save, AlertTriangle } from 'lucide-react';
import { COMMISSION_CONFIG } from '../../../config/commission';
import { validateCommissionRate } from '../../../utils/validation';

export function CommissionSettings() {
  const [commissionRate, setCommissionRate] = useState(COMMISSION_CONFIG.PLATFORM_RATE * 100);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateCommissionRate(commissionRate)) {
      setError('Commission rate must be between 0 and 100');
      return;
    }

    setIsSubmitting(true);

    try {
      // In production, make API call to update commission rate
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Commission rate updated successfully');
    } catch (err) {
      setError('Failed to update commission rate');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center space-x-2 mb-6">
        <DollarSign className="h-6 w-6 text-blue-600" />
        <h2 className="text-lg font-semibold">Platform Commission</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Commission Rate (%)
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={commissionRate}
              onChange={(e) => setCommissionRate(parseFloat(e.target.value))}
              className="block w-full pr-12 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 pl-4"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">%</span>
            </div>
          </div>
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Important Notice
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Changes to commission rate will:</p>
                <ul className="list-disc list-inside mt-1">
                  <li>Apply to all future rides</li>
                  <li>Not affect existing rides</li>
                  <li>Require notification to all companies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center"
          >
            <Save className="h-5 w-5 mr-2" />
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}