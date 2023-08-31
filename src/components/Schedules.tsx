import React, { useEffect, useState } from 'react';
import ScheduleService from '@service/schedule-service'; // Adjust the import path
import { ScheduleDTO } from '@domain/dto/schedule-dto'; // Adjust the import path
import CreateScheduleCard from './CreateScheduleCard';
import { Table } from './Table';

const Schedules: React.FC = () => {
  const [schedules, setSchedules] = useState<ScheduleDTO[]>([]);

  useEffect(() => {
    ScheduleService.getAllSchedules(1000, 0)
      .then((schedules) => setSchedules(schedules))
      .catch((e) => {});
  }, []);

  const onSubmit = () => {
    ScheduleService.getAllSchedules(1000, 0)
      .then((schedules) => setSchedules(schedules))
      .catch((e) => {});
  };

  const onDelete = async (schedule: ScheduleDTO) => {
    ScheduleService.deleteSchedule(schedule.id)
      .then((r) => ScheduleService.getAllSchedules(1000, 0))
      .then((schedules) => setSchedules(schedules))
      .catch((e) => {});
  };

  return (
    <div className="schedules-container">
      <>
        <CreateScheduleCard onSubmit={onSubmit} />
        <div className="card schedules-list-card">
          <h2>Existing Schedules</h2>
          <div className="subsection">
            <Table
              data={schedules}
              onEmpty="No schedules found."
              accessors={{
                createdAt: (schedule) =>
                  new Date(schedule.createdAt).toLocaleString(),
              }}
              onDelete={onDelete}
              omit={['data', 'id', 'accountId', 'sourceId', 'createdAt']}
            />
          </div>
        </div>
      </>
    </div>
  );
};

export default Schedules;
