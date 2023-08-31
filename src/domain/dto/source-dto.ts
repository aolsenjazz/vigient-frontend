import { DatabaseItem } from './database-item';

export interface SourceDTO {
  id: number;
  handle: string;
  createdAt: string;
}

export class SourceDTOImpl extends DatabaseItem implements SourceDTO {
  id: number;
  handle: string;

  constructor(source: SourceDTO) {
    super(source.createdAt);

    this.id = source.id;
    this.handle = source.handle;
  }
}
