'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Icons } from '../ui/icons';

interface TextToSpeechFormProps {
  voiceModels: VoiceModel[];
  isLoading: boolean;
  onConvert: (voiceModelId: string, inputTtsText: string) => Promise<void>;
}

const FormSchema = z.object({
  voice: z.string({
    required_error: 'Please select a voice model.',
  }),
  inputText: z
    .string({
      required_error: 'Please enter at least 1 character.',
    })
    .trim()
    .max(160)
    .min(1),
});

export const CreateTTSJobForm = ({
  voiceModels,
  isLoading,
  onConvert,
}: TextToSpeechFormProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    await onConvert(data.voice, data.inputText);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="voice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Voice model</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a voice model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {voiceModels.map((voiceModel) => {
                    return (
                      <SelectItem
                        key={voiceModel.id}
                        value={voiceModel.id.toString()}
                      >
                        {voiceModel.title}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="inputText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Input text</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Text to convert"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button className="w-20" type="submit">
            {isLoading ? <Icons.spinner className="animate-spin" /> : 'Convert'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
