import { DatabaseItem } from './database-item';

export interface AccountDTO {
  id: number;
  handle: string;
  createdAt: string;
}

export class AccountDTOImpl extends DatabaseItem implements AccountDTO {
  id: number;
  handle: string;

  constructor(a: AccountDTO) {
    super(a.createdAt);

    this.id = a.id;
    this.handle = a.handle;
  }
}
