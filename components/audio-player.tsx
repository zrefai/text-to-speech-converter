import { createDownloadElement } from '@/utils/create-download-element';
import React, { useState } from 'react';
import { Icons } from './ui/icons';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

interface AudioPlayerProps {
  isDisabled: boolean;
  outputFileUrl?: string;
  lossyOutputFileUrl?: string;
}

export const AudioPlayer = ({
  isDisabled,
  outputFileUrl,
  lossyOutputFileUrl,
}: AudioPlayerProps) => {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const onPlayAudio = async () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      await audioRef.current?.play();
    }
  };

  const onDownload = () => {
    if (outputFileUrl) {
      createDownloadElement(outputFileUrl);
    } else if (lossyOutputFileUrl) {
      createDownloadElement(lossyOutputFileUrl);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        preload="auto"
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => {
          setProgress(
            (e.currentTarget.currentTime / e.currentTarget.duration) * 100
          );
        }}
      >
        {isDisabled && outputFileUrl === null ? null : (
          <source type="audio/mpeg" src={outputFileUrl} />
        )}
      </audio>
      <div className="flex flex-row gap-3 items-center">
        <Button
          disabled={isDisabled}
          variant="outline"
          onClick={onPlayAudio}
          size="sm"
        >
          {isPlaying ? <Icons.pause /> : <Icons.play />}
        </Button>
        <Progress value={progress} className="w-full" />
        <Button
          disabled={isDisabled}
          variant="outline"
          size="sm"
          onClick={onDownload}
        >
          <Icons.download />
        </Button>
      </div>
    </>
  );
};
