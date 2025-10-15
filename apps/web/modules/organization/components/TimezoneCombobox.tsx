'use client';

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { timezones } from '@/modules/landing/hook/timezone';
import { useEffect, useState } from 'react';

interface TimezoneComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

export function TimezoneCombobox({ value, onChange }: TimezoneComboboxProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!value) {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz && timezones.includes(tz)) {
          onChange(tz);
        }
      } catch (err) {
        console.error('Cannot detect timezone:', err);
      }
    }
  }, [value, onChange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="w-full h-12 rounded-xl border border-white/20 bg-white/10 hover:bg-white/10 hover:text-white cursor-pointer px-3 text-white focus:bg-white/15 focus:border-white/30"
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value || 'Select timezone...'}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search timezone..." />
          <CommandList>
            <CommandEmpty>No Timezone found.</CommandEmpty>
            <CommandGroup>
              {timezones.map((time) => (
                <CommandItem
                  key={time}
                  value={time}
                  onSelect={(currentValue:string) => {
                    onChange(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === time ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {time}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
