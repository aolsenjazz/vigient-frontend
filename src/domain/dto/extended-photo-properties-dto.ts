export type PreStorageExtendedPhotoPropertiesDTO = Omit<
  ExtendedPhotoPropertiesDTO,
  'id' | 'entityId'
>;

export interface ExtendedPhotoPropertiesDTO {
  id: number;
  entityId: number;
  originalInfo: any;
  sizes: any;
}
