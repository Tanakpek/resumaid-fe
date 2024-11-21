import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "tw-flex tw-min-h-[60px] tw-w-full tw-rounded-md tw-border tw-border-slate-200 tw-bg-transparent tw-px-3 tw-py-2 tw-text-base tw-shadow-sm placeholder:tw-text-slate-500 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-slate-950 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm dark:tw-border-slate-800 dark:placeholder:tw-text-slate-400 dark:focus-visible:tw-ring-slate-300",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
