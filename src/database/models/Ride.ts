import { BaseModel } from './BaseModel';

export interface Ride extends BaseModel {
  customerId: string;
  driverId?: string;
  companyId: string;
  pickup: {
    address: string;
    coordinates: [number, number];
    instructions?: string;
  };
  dropoff: {
    address: string;
    coordinates: [number, number];
    instructions?: string;
  };
  status: 'pending' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
  type: 'immediate' | 'scheduled' | 'airport';
  class: 'first' | 'business' | 'economy' | 'ambulance';
  fare: {
    base: number;
    distance: number;
    time: number;
    surge?: number;
    total: number;
    currency: string;
  };
  payment: {
    method: 'cash' | 'card' | 'corporate';
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    transactionId?: string;
  };
  schedule?: {
    pickupTime: Date;
    isRecurring: boolean;
    frequency?: 'daily' | 'weekly' | 'monthly';
  };
  flightDetails?: {
    flightNumber: string;
    airline: string;
    terminal: string;
    arrivalTime?: Date;
    departureTime?: Date;
  };
  rating?: {
    driver: number;
    customer: number;
    comment?: string;
  };
  metadata: {
    distance: number;
    duration: number;
    startTime?: Date;
    endTime?: Date;
    cancelReason?: string;
  };
}