import { DatabaseItem } from './database-item';

export interface ScheduleDTO {
  id: number;
  jobType: string;
  accountId?: number | null; // Can be null
  data?: any | null; // You could define a more specific type if applicable
  eligibilityWindowStart: number;
  eligibilityWindowEnd: number;
  frequencyMinutes: number;
  createdAt: string;
}

export class ScheduleDTOImpl extends DatabaseItem implements ScheduleDTO {
  id: number;
  jobType: string;
  accountId?: number | null;
  data?: any | null;
  eligibilityWindowStart: number;
  eligibilityWindowEnd: number;
  frequencyMinutes: number;

  constructor(s: ScheduleDTO) {
    super(s.createdAt);

    this.id = s.id;
    this.jobType = s.jobType;
    this.accountId = s.accountId;
    this.data = s.data;
    this.eligibilityWindowStart = s.eligibilityWindowStart;
    this.eligibilityWindowEnd = s.eligibilityWindowEnd;
    this.frequencyMinutes = s.frequencyMinutes;
  }
}
