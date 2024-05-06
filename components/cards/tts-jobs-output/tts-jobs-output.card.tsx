import { useContext } from 'react';
import { TTSJobsContext } from '../../../providers/tts-jobs.provider';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../ui/card';
import { TTSJobRow } from './tts-job-row';
import { Skeleton } from '../../ui/skeleton';
import { Separator } from '../../ui/separator';

export const TTSJobsCard = () => {
  const context = useContext(TTSJobsContext);
  const isLoading = context?.isLoading;
  const lastFiveJobsFromPastHour = context?.jobs ?? [];

  return (
    <Card className="w-[452px]">
      <CardHeader>
        <CardTitle>Outputs</CardTitle>
        <CardDescription>
          This section will show your last 5 conversions.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {isLoading ? (
          <>
            <TTSJobSkeleton />
            <TTSJobSkeleton />
            <TTSJobSkeleton />
          </>
        ) : (
          lastFiveJobsFromPastHour.map((job) => (
            <TTSJobRow key={job.id} job={job} />
          ))
        )}
      </CardContent>
    </Card>
  );
};

const TTSJobSkeleton = () => {
  return (
    <div className="flex flex-col gap-5">
      <Separator className="w-full" />
      <div className="flex flex-row gap-4">
        <Skeleton className="h-auto w-20 rounded-lg" />
        <div className="flex flex-col gap-4 w-full">
          <Skeleton className="h-6 w-auto" />
          <Skeleton className="h-6 w-auto" />
        </div>
      </div>
    </div>
  );
};
