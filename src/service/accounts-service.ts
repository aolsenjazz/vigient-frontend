import { AccountDTO, AccountDTOImpl } from '@domain/dto/account-dto';
import { SourceDTO } from '@domain/dto/source-dto';
import { client } from '../vigient-client';

class AccountsService {
  static async getAllAccounts(
    limit: number,
    offset: number
  ): Promise<AccountDTO[]> {
    const response = await client.get('/accounts', {
      params: { limit, offset },
    });

    return response.data.map(
      (account: AccountDTO) => new AccountDTOImpl(account)
    );
  }

  static async getAccountById(id: number): Promise<AccountDTO> {
    const response = await client.get(`/accounts/${id}`);

    return new AccountDTOImpl(response.data);
  }

  static async createAccount(handle: string): Promise<AccountDTO> {
    const response = await client.post('/accounts', {
      handle,
    });

    return new AccountDTOImpl(response.data);
  }

  static async updateAccount(id: number, handle: string): Promise<AccountDTO> {
    const response = await client.put(`/accounts/${id}`, {
      handle,
    });

    return new AccountDTOImpl(response.data);
  }

  static async deleteAccount(id: number): Promise<void> {
    await client.delete(`/accounts/${id}`);
  }

  static async getLinkedSourcesForAccount(id: number): Promise<SourceDTO[]> {
    const response = await client.get(`/accounts/${id}/sources`);
    return response.data; // Assuming data is already in the desired shape, otherwise you can map it.
  }

  static async getUnlinkedSourcesForAccount(id: number): Promise<SourceDTO[]> {
    const response = await client.get(`/accounts/${id}/unlinked-sources`);
    return response.data; // Assuming data is already in the desired shape, otherwise you can map it.
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
}

export default AccountsService;
