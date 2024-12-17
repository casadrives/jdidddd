import { BaseModel } from './BaseModel';

export interface Driver extends BaseModel {
  userId: string;
  companyId: string;
  licenseNumber: string;
  licenseExpiry: Date;
  status: 'pending' | 'active' | 'suspended' | 'offline';
  vehicle: {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    class: 'first' | 'business' | 'economy' | 'ambulance';
  };
  documents: {
    license: string;
    insurance: string;
    medicalCertificate: string;
    backgroundCheck: string;
  };
  rating: number;
  totalRides: number;
  totalEarnings: number;
  location?: {
    latitude: number;
    longitude: number;
    lastUpdate: Date;
  };
  availability: {
    isOnline: boolean;
    lastOnline: Date;
    schedule: Array<{
      day: number;
      start: string;
      end: string;
    }>;
  };
}