import { BaseRepository } from './BaseRepository';
import { User } from '../models/User';

export class UserRepository extends BaseRepository<User> {
  protected tableName = 'users';

  async findByEmail(email: string): Promise<User | null> {
    // Implementation would use actual database
    throw new Error('Not implemented');
  }

  async updateLastLogin(id: string): Promise<void> {
    // Implementation would use actual database
    throw new Error('Not implemented');
  }

  async updateSettings(id: string, settings: User['settings']): Promise<void> {
    // Implementation would use actual database
    throw new Error('Not implemented');
  }
}