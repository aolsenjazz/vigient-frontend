export type JobStatus = 'running' | 'complete' | 'paused' | 'stopped';

export interface JobDTO {
  id: number;
  startDate: string;
  status: JobStatus;
  type: string;
  target: string;
  stopReason?: string;
  completeDate?: string;
}

export class JobDTOImpl implements JobDTO {
  id: number;
  startDate: string;
  status: JobStatus;
  type: string;
  target: string;
  stopReason?: string;
  completeDate?: string;

  constructor(j: JobDTO) {
    this.id = j.id;
    this.startDate = j.startDate;
    this.status = j.status;
    this.type = j.type;
    this.target = j.target;
    this.completeDate = j.completeDate;
    this.stopReason = j.stopReason;
  }
}
