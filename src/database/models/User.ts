import { BaseModel } from './BaseModel';

export interface User extends BaseModel {
  name: string;
  email: string;
  role: 'admin' | 'company' | 'driver' | 'user';
  status: 'active' | 'inactive' | 'suspended';
  phone?: string;
  avatar?: string;
  lastLogin?: Date;
  settings?: {
    notifications: boolean;
    language: string;
    theme: 'light' | 'dark';
  };
}