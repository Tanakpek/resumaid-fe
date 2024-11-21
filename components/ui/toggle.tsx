import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-rounded-md tw-text-sm tw-font-medium tw-transition-colors hover:tw-bg-slate-100 hover:tw-text-slate-500 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-slate-950 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-slate-100 data-[state=on]:tw-text-slate-900 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0 dark:hover:tw-bg-slate-800 dark:hover:tw-text-slate-400 dark:focus-visible:tw-ring-slate-300 dark:data-[state=on]:tw-bg-slate-800 dark:data-[state=on]:tw-text-slate-50",
  {
    variants: {
      variant: {
        default: "tw-bg-transparent",
        outline:
          "tw-border tw-border-slate-200 tw-bg-transparent tw-shadow-sm hover:tw-bg-slate-100 hover:tw-text-slate-900 dark:tw-border-slate-800 dark:hover:tw-bg-slate-800 dark:hover:tw-text-slate-50",
      },
      size: {
        default: "tw-h-9 tw-px-2 tw-min-w-9",
        sm: "tw-h-8 tw-px-1.5 tw-min-w-8",
        lg: "tw-h-10 tw-px-2.5 tw-min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
