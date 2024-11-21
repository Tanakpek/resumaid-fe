import * as React from "react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("tw-p-3", className)}
      classNames={{
        months: "tw-flex tw-flex-col sm:tw-flex-row tw-space-y-4 sm:tw-space-x-4 sm:tw-space-y-0",
        month: "tw-space-y-4",
        caption: "tw-flex tw-justify-center tw-pt-1 tw-relative tw-items-center",
        caption_label: "tw-text-sm tw-font-medium",
        nav: "tw-space-x-1 tw-flex tw-items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "tw-h-7 tw-w-7 tw-bg-transparent tw-p-0 tw-opacity-50 hover:tw-opacity-100"
        ),
        nav_button_previous: "tw-absolute tw-left-1",
        nav_button_next: "tw-absolute tw-right-1",
        table: "tw-w-full tw-border-collapse tw-space-y-1",
        head_row: "tw-flex",
        head_cell:
          "tw-text-slate-500 tw-rounded-md tw-w-8 tw-font-normal tw-text-[0.8rem] dark:tw-text-slate-400",
        row: "tw-flex tw-w-full tw-mt-2",
        cell: cn(
          "tw-relative tw-p-0 tw-text-center tw-text-sm focus-within:tw-relative focus-within:tw-z-20 [&:has([aria-selected])]:tw-bg-slate-100 [&:has([aria-selected].day-outside)]:tw-bg-slate-100/50 [&:has([aria-selected].day-range-end)]:tw-rounded-r-md dark:[&:has([aria-selected])]:tw-bg-slate-800 dark:[&:has([aria-selected].day-outside)]:tw-bg-slate-800/50",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:tw-rounded-r-md [&:has(>.day-range-start)]:tw-rounded-l-md first:[&:has([aria-selected])]:tw-rounded-l-md last:[&:has([aria-selected])]:tw-rounded-r-md"
            : "[&:has([aria-selected])]:tw-rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "tw-h-8 tw-w-8 tw-p-0 tw-font-normal aria-selected:tw-opacity-100"
        ),
        day_range_start: "tw-day-range-start",
        day_range_end: "tw-day-range-end",
        day_selected:
          "tw-bg-slate-900 tw-text-slate-50 hover:tw-bg-slate-900 hover:tw-text-slate-50 focus:tw-bg-slate-900 focus:tw-text-slate-50 dark:tw-bg-slate-50 dark:tw-text-slate-900 dark:hover:tw-bg-slate-50 dark:hover:tw-text-slate-900 dark:focus:tw-bg-slate-50 dark:focus:tw-text-slate-900",
        day_today: "tw-bg-slate-100 tw-text-slate-900 dark:tw-bg-slate-800 dark:tw-text-slate-50",
        day_outside:
          "tw-day-outside tw-text-slate-500 aria-selected:tw-bg-slate-100/50 aria-selected:tw-text-slate-500 dark:tw-text-slate-400 dark:aria-selected:tw-bg-slate-800/50 dark:aria-selected:tw-text-slate-400",
        day_disabled: "tw-text-slate-500 tw-opacity-50 dark:tw-text-slate-400",
        day_range_middle:
          "aria-selected:tw-bg-slate-100 aria-selected:tw-text-slate-900 dark:aria-selected:tw-bg-slate-800 dark:aria-selected:tw-text-slate-50",
        day_hidden: "tw-invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="tw-h-4 tw-w-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="tw-h-4 tw-w-4" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
