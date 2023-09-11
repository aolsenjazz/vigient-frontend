import { SourceDTOImpl } from '@domain/dto/source-dto';
import SourceService from '@service/source-service';
import React, { useEffect, useState } from 'react';

type Props = {
  setJobConfig: (a: any) => void;
};

const FullScrapeConfig = ({ setJobConfig }: Props) => {
  const [allSources, setAllSources] = useState<SourceDTOImpl[]>([]);
  const [sourceId, setSourceId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSources = async () => {
      const sources = await SourceService.getAllSources(1000, 0);
      setAllSources(sources);
    };

    fetchSources();
  }, []);

  useEffect(() => {
    setJobConfig({ sourceId });
  }, [sourceId]);

  return (
    <>
      <h3>Job Config</h3>
      <div className="fields">
        <div className="input-div">
          <label>Source ID:</label>
          <select
            value={sourceId || ''}
            onChange={(e) => setSourceId(parseInt(e.target.value, 10))}
          >
            <option value="" disabled>
              Select a Source
            </option>
            {allSources.map((source) => (
              <option key={source.id} value={source.id}>
                {source.handle}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default FullScrapeConfig;
