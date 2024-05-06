import { useGet } from '@/hooks/useGet';
import { URL_PATHS } from '@/utils/constants';
import { createContext } from 'react';

export type TTSJobsContextType = {
  jobs: TTSJob[];
  saveJob: (job: TTSJob) => void;
  isLoading: boolean;
};

export const TTSJobsContext = createContext<TTSJobsContextType | null>(null);

const TTSJobsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { data, setData, isLoading } = useGet<PaginatedResponse<TTSJob>>(
    URL_PATHS.textToSpeech.getTTSJobs
  );
  const jobs = data?.data.slice(0, 5);

  const saveJob = (job: TTSJob) => {
    if (data?.data) {
      const updatedData = {
        ...data,
      };

      updatedData.data = [job, ...data.data];
      setData(updatedData);
    }
  };

  return (
    <TTSJobsContext.Provider value={{ jobs: jobs ?? [], saveJob, isLoading }}>
      {children}
    </TTSJobsContext.Provider>
  );
};

export default TTSJobsProvider;
