import FullScrapeConfig from './FullScrapeConfig';
import HeadScrapeConfig from './HeadScrapeConfig';
import PostConfig from './PostConfig';
import ScrollConfig from './ScrollConfig';

type JobsConfigurationParams = {
  jobType: string;
  setJobConfig: (a: any) => void;
};

const JobConfiguration = ({
  jobType,
  setJobConfig,
}: JobsConfigurationParams) => {
  switch (jobType) {
    case 'post':
      return <PostConfig setJobConfig={setJobConfig} />;
    case 'fullscrape':
      return <FullScrapeConfig setJobConfig={setJobConfig} />;
    case 'headscrape':
      return <HeadScrapeConfig setJobConfig={setJobConfig} />;
    case 'scroll':
      return <ScrollConfig setJobConfig={setJobConfig} />;
    case 'profileRefresh':
      return null;
    default:
      throw new Error();
  }
};

export default JobConfiguration;
