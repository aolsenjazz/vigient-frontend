import { DatabaseItem } from './database-item';

export interface AccountSourceRelationDTO {
  id: number;
  accountId: number;
  sourceId: number;
  createdAt: string;
}

export class AccountSourceRelationDTOImpl
  extends DatabaseItem
  implements AccountSourceRelationDTO
{
  id: number;
  accountId: number;
  sourceId: number;

  constructor(asr: AccountSourceRelationDTO) {
    super(asr.createdAt);

    this.id = asr.id;
    this.accountId = asr.accountId;
    this.sourceId = asr.sourceId;
  }
}
