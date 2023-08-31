import { AccountDTO, AccountDTOImpl } from '@domain/dto/account-dto';
import { ScheduleDTO, ScheduleDTOImpl } from '@domain/dto/schedule-dto';
import { SourceDTO, SourceDTOImpl } from '@domain/dto/source-dto';
import { client } from '../vigient-client';

class AccountsService {
  static async getAllAccounts(
    limit: number,
    offset: number
  ): Promise<AccountDTOImpl[]> {
    const response = await client.get('/accounts', {
      params: { limit, offset },
    });

    return response.data.map(
      (account: AccountDTO) => new AccountDTOImpl(account)
    );
  }

  static async getAccountById(id: number): Promise<AccountDTOImpl> {
    const response = await client.get(`/accounts/${id}`);

    return new AccountDTOImpl(response.data);
  }

  static async createAccount(handle: string): Promise<AccountDTOImpl> {
    const response = await client.post('/accounts', {
      handle,
    });

    return new AccountDTOImpl(response.data);
  }

  static async updateAccount(
    id: number,
    handle: string
  ): Promise<AccountDTOImpl> {
    const response = await client.put(`/accounts/${id}`, {
      handle,
    });

    return new AccountDTOImpl(response.data);
  }

  static async deleteAccount(id: number): Promise<void> {
    await client.delete(`/accounts/${id}`);
  }

  static async getLinkedSourcesForAccount(
    id: number
  ): Promise<SourceDTOImpl[]> {
    const response = await client.get(`/accounts/${id}/sources`);
    return response.data.map((dto: SourceDTO) => new SourceDTOImpl(dto));
  }

  static async getUnlinkedSourcesForAccount(
    id: number
  ): Promise<SourceDTOImpl[]> {
    const response = await client.get(`/accounts/${id}/unlinked-sources`);
    return response.data.map((dto: SourceDTO) => new SourceDTOImpl(dto));
  }

  static async addSourceToAccount(
    accountId: number,
    sourceId: number
  ): Promise<void> {
    await client.post(`/accounts/${accountId}/sources`, { sourceId });
  }

  static async deleteSourceFromAccount(
    accountId: number,
    sourceId: number
  ): Promise<void> {
    await client.delete(`/accounts/${accountId}/sources/${sourceId}`);
  }

  static async getSchedulesForAccount(id: number): Promise<ScheduleDTOImpl[]> {
    const response = await client.get(`/accounts/${id}/schedules`);
    return response.data.map((dto: ScheduleDTO) => new ScheduleDTOImpl(dto));
  }
}

export default AccountsService;
