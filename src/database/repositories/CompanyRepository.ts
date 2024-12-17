import { BaseRepository } from './BaseRepository';
import { Company } from '../models/Company';

export class CompanyRepository extends BaseRepository<Company> {
  protected tableName = 'companies';

  async findByRegistrationNumber(number: string): Promise<Company | null> {
    // Implementation would use actual database
    throw new Error('Not implemented');
  }

  async updateCommissionStatus(id: string, paid: boolean): Promise<void> {
    // Implementation would use actual database
    throw new Error('Not implemented');
  }

  async getOverdueCompanies(): Promise<Company[]> {
    // Implementation would use actual database
    throw new Error('Not implemented');
  }
}