'use client';
import TTSJobsProvider from '@/providers/tts-jobs.provider';
import { ThemeProvider } from '@/providers/theme.provider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Toaster } from '@/components/ui/toaster';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TTSJobsProvider>
          <Component {...pageProps} />
          <Toaster />
        </TTSJobsProvider>
      </ThemeProvider>
    </main>
  );
}
