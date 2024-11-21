
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { useState } from "react"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    title: string
    element: JSX.Element[]
    onClick: (e: React.MouseEvent) => void
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {

    const [hiddenItems, setHiddenItems] = useState<Record<string, boolean>>({});

    // Function to toggle hidden state
    // const toggleHidden = (title: string) => {
    //   setHiddenItems(prev => ({
    //     ...prev,
    //     [title]: !prev[title]  // Toggle the current state
    //   }));
    // };
  return (
    <nav
      className={cn(
        "tw-flex tw-space-x-2 lg:tw-flex-col lg:tw-space-x-0 lg:tw-space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item, key) => (
        <button
          key={item.title}
          className={cn(
            buttonVariants({ variant: "ghost"}),
          )}
          onClick={(e) => {
            item.onClick(e)
          }}
        >
          {item.title}
        </button>
      ))}
    </nav>
  )
}