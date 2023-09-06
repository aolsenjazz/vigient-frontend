export type PreStorageExtendedVideoPropertiesDTO = Omit<
  ExtendedVideoPropertiesDTO,
  'id' | 'entityId'
>;

export interface ExtendedVideoPropertiesDTO {
  id: number;
  entityId: number;
  sourceStatusIdStr: string;
  sourceUserIdStr: string;
  aspectRatio: string;
  durationMillis: number;
  viewCount: number;
  originalInfo: any;
  variants: any;
}
