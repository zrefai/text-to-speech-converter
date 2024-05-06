import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../../ui/card';
import { CreateTTSJobForm } from '../../forms/create-tts-job.form';
import { useGet } from '@/hooks/useGet';
import { Error } from '../../ui/error';
import { useContext, useEffect } from 'react';
import { TTSJobsContext } from '@/providers/tts-jobs.provider';
import { Skeleton } from '../../ui/skeleton';
import { useToast } from '../../ui/use-toast';
import { useMultipartFormRequest } from '@/hooks/useMultipartFormRequest';
import { URL_PATHS } from '@/utils/constants';

export const CreateTTSJobCard = () => {
  const { toast } = useToast();
  const context = useContext(TTSJobsContext);
  const {
    data,
    isLoading: isGetVoiceModelsLoading,
    error: getVoiceModelsError,
    retry,
  } = useGet<PaginatedResponse<VoiceModel>>(
    URL_PATHS.voiceModels.getVoiceModels
  );
  const {
    request,
    isLoading: isCreateTTSJobLoading,
    error: createTTSJobError,
  } = useMultipartFormRequest<TTSJob>(URL_PATHS.textToSpeech.createTTSJob);

  useEffect(() => {
    if (createTTSJobError) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request. Please try again.',
      });
    }
  }, [createTTSJobError]);

  const onConvert = async (voiceModelId: string, inputTtsText: string) => {
    const response = await request({ voiceModelId, inputTtsText });

    if (context && response) {
      context.saveJob(response);
      toast({
        description: 'A job was created for you request.',
      });
    }
  };

  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Text to speech</CardTitle>
        <CardDescription>
          Select a voice model and provide text to generate speech
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isGetVoiceModelsLoading ? (
          <TTSFormSkeleton />
        ) : getVoiceModelsError ? (
          <Error retry={retry} />
        ) : (
          <CreateTTSJobForm
            voiceModels={data?.data ?? []}
            isLoading={isCreateTTSJobLoading}
            onConvert={onConvert}
          />
        )}
      </CardContent>
    </Card>
  );
};

const TTSFormSkeleton = () => {
  return (
    <div className="flex flex-col space-y-6 h-[272px]">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-auto" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-20 w-auto" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  );
};
