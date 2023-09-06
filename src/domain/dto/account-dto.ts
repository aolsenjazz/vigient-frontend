import { DatabaseItem } from './database-item';

export interface AccountDTO {
  id: number;
  handle: string;
  createdAt: string;

  oauth1AccessToken?: string;
  oauth1AccessTokenSecret?: string;

  oauth2AccessToken?: string;
  oauth2RefreshToken?: string;
}

export class AccountDTOImpl extends DatabaseItem implements AccountDTO {
  id: number;
  handle: string;

  oauth1AccessToken?: string;
  oauth1AccessTokenSecret?: string;

  oauth2AccessToken?: string;
  oauth2RefreshToken?: string;

  constructor(a: AccountDTO) {
    super(a.createdAt);

    this.id = a.id;
    this.handle = a.handle;

    this.oauth1AccessToken = a.oauth1AccessToken;
    this.oauth1AccessTokenSecret = a.oauth1AccessTokenSecret;

    this.oauth2AccessToken = a.oauth2AccessToken;
    this.oauth2RefreshToken = a.oauth2RefreshToken;
  }
}
