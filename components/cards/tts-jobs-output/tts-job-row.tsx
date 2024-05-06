import React from 'react';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';
import { useEffect, useState } from 'react';
import { getMinutesAgo } from '@/utils/get-minutes-ago';
import { minutesToShorthand } from '@/utils/minutes-to-shorthand';
import { AudioPlayer } from '../../audio-player';
import { useJobMonitoring } from '@/hooks/useJobMonitoring';

interface TTSJobRowProps {
  job: TTSJob;
}

export const TTSJobRow = ({ job }: TTSJobRowProps) => {
  const currentDate = new Date().toISOString();
  const { data } = useJobMonitoring(job);
  const [minutesAgo, setMinutesAgo] = useState(
    getMinutesAgo(job.jobStartTime ?? currentDate)
  );
  console.log(job);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMinutesAgo(getMinutesAgo(data.jobStartTime ?? currentDate));
    }, 30000);

    return () => clearInterval(intervalId);
  }, [job.jobStartTime]);

  const formattedTitle =
    data.model?.title && data.model.title.length > 18
      ? data.model.title.slice(0, 15) + '...'
      : data.model?.title;

  return (
    <div className="flex flex-col gap-3">
      <Separator className="w-full" />
      <div className="flex flex-row gap-3">
        {job.model?.imageUrl ? (
          <img
            className="flex-1 h-auto w-20 rounded-lg"
            src={job.model?.imageUrl}
          />
        ) : null}
        <div className="flex flex-4 flex-col gap-4 w-full">
          <div className="flex flex-row gap-2 items-center">
            <Badge variant={data.status}>{data.status.toUpperCase()}</Badge>
            <p className="text-sm">{minutesToShorthand(minutesAgo)}</p> -
            <a
              className={`text-sm ${data.model?.demoUrl ? 'underline' : null}`}
              href={data.model?.demoUrl}
            >
              {formattedTitle}
            </a>
          </div>
          <AudioPlayer
            isDisabled={data.status === 'running'}
            outputFileUrl={data.outputFileUrl}
            lossyOutputFileUrl={data.lossyOutputFileUrl}
          />
        </div>
      </div>
    </div>
  );
};
