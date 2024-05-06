import { KITS_API_KEY, KITS_URL, URL_PATHS } from '@/utils/constants';
import { useEffect, useState } from 'react';

const headers = {
  Authorization: `Bearer ${KITS_API_KEY}`,
};

export function useJobMonitoring(job: TTSJob) {
  const [data, setData] = useState(job);

  const monitorJobStatus = async () => {
    if (job.status === 'running') {
      let status = 'running';
      const url = new URL(
        URL_PATHS.textToSpeech.getTTsJobById(job.id.toString()),
        KITS_URL
      );

      while (status === 'running') {
        const response = await fetch(url.href, { method: 'GET', headers })
          .then((response) => response.json())
          .then((response) => response as TTSJob);
        status = response.status;

        if (status != 'running') {
          setData(response);
          break;
        }

        await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      }
    }
  };

  useEffect(() => {
    monitorJobStatus();
  }, [job.id]);

  return { data };
}
