import { useMemo, useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

const BLACKLISTED_VOICE_MODE_ID = '1218436';

interface SelectVoiceModelDialogProps {
  voiceModels: VoiceModel[];
  onChange: (...event: any[]) => void;
}

export const SelectVoiceModelDialog = ({
  voiceModels,
  onChange,
}: SelectVoiceModelDialogProps) => {
  const [open, setIsOpen] = useState(false);
  const [voiceModelId, setVoiceModelId] = useState<string | null>(null);

  const prunedVoiceModels = useMemo(() => {
    const filteredList = voiceModels.filter(
      (mode) => mode.id != BLACKLISTED_VOICE_MODE_ID
    );
    if (filteredList.length > 9) {
      return filteredList.slice(0, 9);
    }
    return filteredList;
  }, [voiceModels]);

  const buttonTitle = voiceModelId
    ? voiceModels.find((model) => model.id == voiceModelId)?.title
    : 'Select a voice model';

  const onSaveChanges = () => {
    onChange(voiceModelId);
    setIsOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{buttonTitle}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Available voice models</DialogTitle>
          <DialogDescription>
            You can listen to each voice model before selecting. Click save
            after making a change.
          </DialogDescription>
        </DialogHeader>
        <ToggleGroup
          type="single"
          onValueChange={(value) => {
            if (value) setVoiceModelId(value);
          }}
        >
          <div className="grid gap-x-3 gap-y-3 grid-cols-3 py-3">
            {prunedVoiceModels.map((voiceModel) => {
              return (
                <ToggleGroupItem
                  key={voiceModel.id}
                  value={voiceModel.id.toString()}
                  size="adaptive"
                >
                  <div className="flex flex-col items-center gap-2 p-2">
                    <img
                      className="h-auto w-20 rounded-lg"
                      src={voiceModel?.imageUrl}
                    />
                    <p className="text-xs">{voiceModel.title}</p>
                  </div>
                </ToggleGroupItem>
              );
            })}
          </div>
        </ToggleGroup>
        <DialogFooter>
          <Button type="submit" onClick={onSaveChanges}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
