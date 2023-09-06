import {
  MediaEntityDTO,
  PreStorageMediaEntityDTO,
} from '@domain/dto/media-entity-dto';

export interface PostDTO {
  id: number;
  idStr: string;
  text: string | null;
  possiblySensitive: boolean;
  quoteCount: number;
  replyCount: number;
  retweetCount: number;
  sourceId: number;
  twitterCreatedAt: string | null;
  mediaEntities: MediaEntityDTO[];
}

export interface PreStoragePostDTO {
  idStr: string;
  text: string | null;
  possiblySensitive: boolean;
  quoteCount: number;
  replyCount: number;
  retweetCount: number;
  sourceId: number;
  twitterCreatedAt: string | null;
  mediaEntities: PreStorageMediaEntityDTO[];
}
