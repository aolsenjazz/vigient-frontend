import { DatabaseItem } from './database-item';

export type HandleDetails = {
  sourceHandle?: string;
  accountHandle?: string;
};

export interface ScheduleDTO {
  id: number;
  jobType: string;
  accountId?: number | null; // Can be null
  data?: any | null; // You could define a more specific type if applicable
  eligibilityWindowStart: string; // Changed type to string to represent time
  eligibilityWindowEnd: string; // Changed type to string to represent time
  frequencyMinutes: number;
  createdAt: string; // Added createdAt
  sourceId?: number | null; // Added sourceId
}

export class ScheduleDTOImpl extends DatabaseItem implements ScheduleDTO {
  id: number;
  jobType: string;
  accountId?: number | null;
  data?: any | null;
  eligibilityWindowStart: string; // Changed type to string to represent time
  eligibilityWindowEnd: string; // Changed type to string to represent time
  frequencyMinutes: number;
  sourceId?: number | null; // Added sourceId

  sourceHandle?: string;
  accountHandle?: string;

  constructor(s: ScheduleDTO & HandleDetails) {
    super(s.createdAt);

    this.id = s.id;
    this.jobType = s.jobType;
    this.accountId = s.accountId;
    this.data = s.data;
    this.eligibilityWindowStart = s.eligibilityWindowStart;
    this.eligibilityWindowEnd = s.eligibilityWindowEnd;
    this.frequencyMinutes = s.frequencyMinutes;
    this.sourceId = s.sourceId;

    this.sourceHandle = s.sourceHandle;
    this.accountHandle = s.accountHandle;
  }
}
