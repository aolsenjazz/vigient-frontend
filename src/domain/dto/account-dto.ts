import { DatabaseItem } from './database-item';

export interface AccountDTO {
  id: number;
  handle: string;
  createdAt: string;

  twitterId: string;
  description: string;
  name: string;
  followersCount: number;
  followingCount: number;
  tweetCount: number;
  listedCount: number;

  oauth1AccessToken?: string;
  oauth1AccessTokenSecret?: string;

  oauth2AccessToken?: string;
  oauth2RefreshToken?: string;
}

export class AccountDTOImpl extends DatabaseItem implements AccountDTO {
  id: number;
  handle: string;

  twitterId: string;
  name: string;
  description: string;
  followersCount: number;
  followingCount: number;
  tweetCount: number;
  listedCount: number;

  oauth1AccessToken?: string;
  oauth1AccessTokenSecret?: string;

  oauth2AccessToken?: string;
  oauth2RefreshToken?: string;

  constructor(a: AccountDTO) {
    super(a.createdAt);

    this.id = a.id;

    this.twitterId = a.twitterId;
    this.handle = a.handle;
    this.name = a.name;
    this.description = a.description || '';
    this.followersCount = a.followersCount;
    this.followingCount = a.followingCount;
    this.tweetCount = a.tweetCount;
    this.listedCount = a.listedCount;

    this.oauth1AccessToken = a.oauth1AccessToken;
    this.oauth1AccessTokenSecret = a.oauth1AccessTokenSecret;

    this.oauth2AccessToken = a.oauth2AccessToken;
    this.oauth2RefreshToken = a.oauth2RefreshToken;
  }
}
