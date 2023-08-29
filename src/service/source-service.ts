import { SourceDTO, SourceDTOImpl } from '@domain/dto/source-dto';
import { client } from '../vigient-client';

class SourceService {
  static async getAllSources(
    limit: number,
    offset: number
  ): Promise<SourceDTO[]> {
    const response = await client.get('/sources', {
      params: { limit, offset },
    });

    return response.data.map((source: SourceDTO) => new SourceDTOImpl(source));
  }

  static async getSourceById(id: number): Promise<SourceDTO> {
    const response = await client.get(`/sources/${id}`);

    return new SourceDTOImpl(response.data);
  }

  static async createSource(handle: string | null): Promise<SourceDTO> {
    const response = await client.post('/sources', {
      handle,
    });

    return new SourceDTOImpl(response.data);
  }

  static async updateSource(
    id: number,
    handle: string | null
  ): Promise<SourceDTO> {
    const response = await client.put(`/sources/${id}`, {
      handle,
    });

    return new SourceDTOImpl(response.data);
  }

  static async deleteSource(id: number): Promise<void> {
    await client.delete(`/sources/${id}`);
  }
}

export default SourceService;
