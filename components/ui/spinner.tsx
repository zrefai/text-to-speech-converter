import { Icons } from './icons';

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-[272px]">
      <Icons.spinner className="h-9 w-9 animate-spin" />
    </div>
  );
};
