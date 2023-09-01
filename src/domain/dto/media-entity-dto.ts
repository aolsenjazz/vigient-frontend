import { ExtendedPhotoPropertiesDTO } from './extended-photo-properties-dto';
import { ExtendedVideoPropertiesDTO } from './extended-video-properties-dto';

export type MediaType = 'photo' | 'video';

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
