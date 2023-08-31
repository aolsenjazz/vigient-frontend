import React, { useEffect, useState } from 'react';
import JobsService from '@service/jobs-service'; // Adjust the import according to your folder structure
import { JobDTO, JobDTOImpl } from '@domain/dto/job-dto';
import CreateJobCard from './CreateJobCard';
import { Table } from './Table';

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<JobDTOImpl[]>([]);

  useEffect(() => {
    JobsService.getAllJobs(100, 0)
      .then((jobs) => setJobs(jobs))
      .catch((e) => {});
  }, []);

  const onSubmit = () => {
    JobsService.getAllJobs(100, 0)
      .then((jobs) => setJobs(jobs))
      .catch((e) => {});
  };

  const onDelete = async (job: JobDTOImpl) => {
    JobsService.deleteJob(job.id)
      .then((r) => JobsService.getAllJobs(100, 0))
      .then((jobs) => setJobs(jobs))
      .catch((e) => {});
  };

  return (
    <div className="jobs-container">
      <>
        <CreateJobCard onSubmit={onSubmit} />
        <div className="card jobs-list-card">
          <h2>Existing Jobs</h2>
          <div className="subsection">
            <Table
              data={jobs}
              onEmpty="Get a job, kid!"
              accessors={{
                createdAt: (job) => job.createdAtReadable(),
                startDate: (job) => job.createdAtReadable(),
                priority: (job) => job.getPriorityString(),
              }}
              onDelete={onDelete}
              omit={['data', 'id', 'accountId', 'sourceId']}
            />
          </div>
        </div>
      </>
    </div>
  );
};

export default Jobs;
