import { ModeToggle } from './ui/mode-toggle';

export default function PageHeader() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-row w-screen">
        <div className="flex-1" />
        <h1 className="flex-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Kits AI Text-to-speech
        </h1>
        <div className="flex flex-1 justify-end">
          <div className="mr-8">
            <ModeToggle />
          </div>
        </div>
      </div>
      <p className="w-4/5 text-center	text-xl font-normal">
        Play with unique AI voice models, languages, and pitch without the need
        for voice actors, microphones, or recordings.
      </p>
    </div>
  );
}
