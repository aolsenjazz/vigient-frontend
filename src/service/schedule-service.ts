import { ScheduleDTO, ScheduleDTOImpl } from '@domain/dto/schedule-dto'; // Assuming you have ScheduleDTO defined
import { client } from '../vigient-client'; // Adjust the import path accordingly

class ScheduleService {
  static async getAllSchedules(
    limit: number,
    offset: number
  ): Promise<ScheduleDTOImpl[]> {
    const response = await client.get('/schedules', {
      params: { limit, offset },
    });

    return response.data.map(
      (schedule: ScheduleDTO) => new ScheduleDTOImpl(schedule)
    );
  }

  static async getScheduleById(id: number): Promise<ScheduleDTOImpl> {
    const response = await client.get(`/schedules/${id}`);

    return new ScheduleDTOImpl(response.data);
  }

  static async createSchedule(
    scheduleData: Omit<ScheduleDTO, 'id' | 'createdAt'>
  ): Promise<ScheduleDTOImpl> {
    const response = await client.post('/schedules', scheduleData);

    return new ScheduleDTOImpl(response.data);
  }

  static async updateSchedule(
    id: number,
    scheduleData: Partial<Omit<ScheduleDTO, 'id'>>
  ): Promise<ScheduleDTOImpl> {
    const response = await client.put(`/schedules/${id}`, scheduleData);

    return new ScheduleDTOImpl(response.data);
  }

  static async deleteSchedule(id: number): Promise<void> {
    await client.delete(`/schedules/${id}`);
  }
}

export default ScheduleService;
