export interface PreStorageMediaEntityDTO {
  type: 'video' | 'photo';
  mediaKey: string;
  url: string;
  width: number;
  height: number;
}

export interface MediaEntityDTO {
  id: number;
  postId: number;
  type: 'video' | 'photo';
  mediaKey: string;
  url: string;
  width: number;
  height: number;
  createdAt: string;
}
