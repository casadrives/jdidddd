import { BaseModel } from './BaseModel';

export interface Company extends BaseModel {
  name: string;
  email: string;
  phone: string;
  registrationNumber: string;
  taxiLicense: string;
  status: 'pending' | 'active' | 'suspended';
  fleetSize: number;
  rating: number;
  paymentDue?: Date;
  lastPayment?: Date;
  commission: {
    rate: number;
    lastPaid: Date;
    nextDue: Date;
  };
  address: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  bankDetails?: {
    accountHolder: string;
    iban: string;
    bic: string;
  };
}