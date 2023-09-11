import { DatabaseItem } from './database-item';

export type HandleDetails = {
  sourceHandle?: string;
  accountHandle?: string;
};

export type JobStatus =
  | 'pending'
  | 'running'
  | 'failed'
  | 'paused'
  | 'completed';

export interface JobDTO {
  id: number;
  jobType: string;
  priority: 1 | 2 | 3;
  data?: any;
  state: JobStatus;
  startDate: string;
  completeDate?: string;
  status?: string;
  scheduleId?: number;
  sourceId?: number;
  accountId?: number;
  createdAt: string;
}

export class JobDTOImpl extends DatabaseItem implements JobDTO {
  id: number;
  jobType: string;
  priority: 1 | 2 | 3;
  data?: any;
  state: JobStatus;
  startDate: string;
  completeDate?: string;
  status?: string;
  scheduleId?: number;
  sourceId?: number;
  accountId?: number;

  accountHandle?: string;
  sourceHandle?: string;

  constructor(j: JobDTO & HandleDetails) {
    super(j.createdAt);

    this.id = j.id;
    this.jobType = j.jobType;
    this.priority = j.priority;
    this.data = j.data;
    this.state = j.state;
    this.startDate = j.startDate;
    this.completeDate = j.completeDate;
    this.status = j.status;
    this.scheduleId = j.scheduleId;
    this.accountId = j.accountId;
    this.sourceId = j.sourceId;

    this.accountHandle = j.accountHandle;
    this.sourceHandle = j.sourceHandle;
  }

  getPriorityString() {
    switch (this.priority) {
      case 1:
        return 'LOW';
      case 2:
        return 'MEDIUM';
      case 3:
        return 'HIGH';
      default:
        throw new Error(`invalid priority value ${this.priority}`);
    }
  }

  completeDateReadable() {
    if (!this.completeDate) return '';

    const date = new Date(this.completeDate);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }
}
