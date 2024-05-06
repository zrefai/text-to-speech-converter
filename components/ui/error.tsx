import { Button } from './button';

interface ErrorProps {
  retry: () => Promise<void>;
}

export const Error = ({ retry }: ErrorProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 h-[272px]">
      <p>An error occurred while fetching voice models</p>
      <Button onClick={retry}>Retry</Button>
    </div>
  );
};
