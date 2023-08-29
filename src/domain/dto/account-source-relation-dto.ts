export interface AccountSourceRelationDTO {
  id: number;
  accountId: number;
  sourceId: number;
  createdAt: string;
}

export class AccountSourceRelationDTOImpl implements AccountSourceRelationDTO {
  id: number;
  accountId: number;
  sourceId: number;
  createdAt: string;

  constructor(asr: AccountSourceRelationDTO) {
    this.id = asr.id;
    this.accountId = asr.accountId;
    this.sourceId = asr.sourceId;
    this.createdAt = asr.createdAt;
  }
}
