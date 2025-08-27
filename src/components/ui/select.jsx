import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

const Select = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        className={cn(
          'flex h-12 w-full appearance-none rounded-md border border-zinc-800 bg-zinc-900/50 pl-4 pr-10 py-2 text-base text-gray-200 ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 ease-in-out shadow-inner-sm',
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500 pointer-events-none" />
    </div>
  );
});
Select.displayName = 'Select';

export { Select };