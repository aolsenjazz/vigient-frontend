import { JobDTO, JobDTOImpl } from '@domain/dto/job-dto';
import { client } from '../vigient-client';

class JobsService {
  static async getAllJobs(
    limit: number,
    offset: number
  ): Promise<JobDTOImpl[]> {
    const response = await client.get('/jobs', {
      params: { limit, offset },
    });

    return response.data.map((job: JobDTO) => new JobDTOImpl(job));
  }

  static async getJobById(id: number): Promise<JobDTOImpl> {
    const response = await client.get(`/jobs/${id}`);

    return new JobDTOImpl(response.data);
  }

  static async createJob(
    jobData: Omit<JobDTO, 'id' | 'createdAt' | 'startDate'>
  ): Promise<JobDTOImpl> {
    const response = await client.post('/jobs', jobData);

    return new JobDTOImpl(response.data);
  }

  static async updateJob(
    id: number,
    jobData: Partial<Omit<JobDTO, 'id'>>
  ): Promise<JobDTOImpl> {
    const response = await client.put(`/jobs/${id}`, jobData);

    return new JobDTOImpl(response.data);
  }

  static async deleteJob(id: number): Promise<void> {
    await client.delete(`/jobs/${id}`);
  }
}

export default JobsService;
