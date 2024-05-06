export const KITS_URL = process.env.NEXT_PUBLIC_KITS_URL;
export const KITS_API_KEY = process.env.NEXT_PUBLIC_KITS_API_KEY;

export const URL_PATHS = {
  voiceModels: {
    getVoiceModels: '/api/kits/v1/voice-models',
  },
  textToSpeech: {
    createTTSJob: '/api/kits/v1/tts',
    getTTSJobs: '/api/kits/v1/tts',
    getTTsJobById: (id: string) => `/api/kits/v1/tts/${id}`,
  },
};
