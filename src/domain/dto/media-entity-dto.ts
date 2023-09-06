import {
  ExtendedPhotoPropertiesDTO,
  PreStorageExtendedPhotoPropertiesDTO,
} from './extended-photo-properties-dto';
import {
  ExtendedVideoPropertiesDTO,
  PreStorageExtendedVideoPropertiesDTO,
} from './extended-video-properties-dto';

export type MediaType = 'photo' | 'video';

export interface PreStorageMediaEntityDTO {
  idStr: string;
  type: MediaType;
  mediaKey: string;
  url: string;
  displayUrl: string;
  expandedUrl: string;
  mediaUrlHttps: string;
  extendedPhotoProperties?: PreStorageExtendedPhotoPropertiesDTO;
  extendedVideoProperties?: PreStorageExtendedVideoPropertiesDTO;
}

export interface MediaEntityDTO {
  id: number;
  idStr: string;
  postId: number;
  type: MediaType;
  mediaKey: string;
  url: string;
  displayUrl: string;
  expandedUrl: string;
  mediaUrlHttps: string;
  extendedPhotoProperties?: ExtendedPhotoPropertiesDTO;
  extendedVideoProperties?: ExtendedVideoPropertiesDTO;
}
