type TTSJob = {
  id: number;
  createdAt: string;
  type: 'rvc' | 'uvr' | 'tts';
  voiceModelId?: string;
  status: 'running' | 'success' | 'error' | 'canceled';
  jobStartTime?: string;
  jobEndTime?: string;
  model?: VoiceModel;
  lossyOutputFileUrl?: string;
  outputFileUrl?: string;
  recombinedAudioFileUrl?: string;
};
