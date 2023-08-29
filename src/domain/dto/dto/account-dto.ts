export interface AccountDTO {
  id: number;
  handle: string;
  createdAt: string;
}

export class AccountDTOImpl implements AccountDTO {
  id: number;
  handle: string;
  createdAt: string;

  constructor(a: AccountDTO) {
    this.id = a.id;
    this.handle = a.handle;
    this.createdAt = a.createdAt;
  }
}
