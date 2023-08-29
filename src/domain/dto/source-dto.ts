export interface SourceDTO {
  id: number;
  handle: string | null;
  createdAt: string;
}

export class SourceDTOImpl implements SourceDTO {
  id: number;
  handle: string | null;
  createdAt: string;

  constructor(source: SourceDTO) {
    this.id = source.id;
    this.handle = source.handle;
    this.createdAt = source.createdAt;
  }
}
