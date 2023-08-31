import React, { useEffect, useState } from 'react';
import JobsService from '@service/jobs-service'; // Adjust the import according to your folder structure
import { JobDTO, JobDTOImpl } from '@domain/dto/job-dto';
import CreateJobCard from './CreateJobCard';
import { Table } from './Table';

type DeleteConfirmationState = {
  jobId: number | null;
  show: boolean;
};

const Jobs: React.FC = () => {
  const [jobs, setJobs] = useState<JobDTOImpl[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newJobData, setNewJobData] = useState<Omit<JobDTO, 'id'>>();

  const handleDeleteJob = async (jobId: number | null) => {
    try {
      if (jobId !== null) {
        await JobsService.deleteJob(jobId); // Replace with your actual function
        const updatedJobs = jobs.filter((job) => job.id !== jobId);
        setJobs(updatedJobs);
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const fetchedJobs = await JobsService.getAllJobs(100, 0); // Adjust limit and offset as needed
        setJobs(fetchedJobs);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const onSubmit = async () => {
    const fetchedJobs = await JobsService.getAllJobs(100, 0); // Adjust limit and offset as needed
    setJobs(fetchedJobs);
  };

  const onDelete = async (job: JobDTOImpl) => {
    await JobsService.deleteJob(job.id);
    const fetchedJobs = await JobsService.getAllJobs(100, 0); // Adjust limit and offset as needed
    setJobs(fetchedJobs);
  };

  return (
    <div className="jobs-container">
      {isLoading ? (
        <div className="card loading-card">Loading...</div>
      ) : (
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
      )}
    </div>
  );
};

export default Jobs;
