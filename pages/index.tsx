import PageHeader from '@/components/page-header';
import { CreateTTSJobCard } from '@/components/cards/create-tts-job/create-tts-job.card';
import * as React from 'react';
import { TTSJobsCard } from '@/components/cards/tts-jobs-output/tts-jobs-output.card';

export default function Home() {
  return (
    <div className="flex flex-col items-center my-8 gap-12">
      <PageHeader />
      <div className="flex flex-row gap-8">
        <div className="flex-1">
          <CreateTTSJobCard />
        </div>
        <div className="flex-1">
          <TTSJobsCard />
        </div>
      </div>
    </div>
  );
}
