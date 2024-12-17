import { BaseModel } from './BaseModel';

export interface Transaction extends BaseModel {
  type: 'commission' | 'ride' | 'refund' | 'bonus';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  rideId?: string;
  driverId?: string;
  companyId?: string;
  paymentMethod: 'cash' | 'card' | 'bank_transfer' | 'corporate';
  metadata: {
    description: string;
    reference?: string;
    invoiceNumber?: string;
  };
  commission?: {
    rate: number;
    amount: number;
    recipient: 'platform' | 'company' | 'driver';
  };
}