import { AccountDAO, AccountDAOImpl } from "@domain/account-dto";
import { client } from "../vigient-client";

class AccountsService {
  static async getAllAccounts(
    limit: number,
    offset: number,
  ): Promise<AccountDAO[]> {
    const response = await client.get("/accounts", {
      params: { limit, offset },
    });

    return response.data.map(
      (account: AccountDAO) => new AccountDAOImpl(account),
    );
  }

  static async getAccountById(id: number): Promise<AccountDAO> {
    const response = await client.get(`/accounts/${id}`);

    return new AccountDAOImpl(response.data);
  }

  static async createAccount(handle: string): Promise<AccountDAO> {
    const response = await client.post("/accounts", {
      handle,
    });

    return new AccountDAOImpl(response.data);
  }

  static async updateAccount(id: number, handle: string): Promise<AccountDAO> {
    const response = await client.put(`/accounts/${id}`, {
      handle,
    });

    return new AccountDAOImpl(response.data);
  }

  static async deleteAccount(id: number): Promise<void> {
    await client.delete(`/accounts/${id}`);
  }
}

export default AccountsService;
