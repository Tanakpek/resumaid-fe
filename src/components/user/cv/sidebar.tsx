
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Dispatch, useState } from "react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { cleanCV, isDirty, useDirtyCV } from "./dirtyTracker"
import { Mouse } from "lucide-react"
import { set } from "date-fns"
import { useLocation } from "react-router-dom"

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    title: string
    element: JSX.Element[]
    onClick: (e: any) => void
  }[]
}

export function SidebarNav({ className, items, resetCV, ...props }: SidebarNavProps & {resetCV:()=>void} ) {
    const cvDirty = useDirtyCV()
    const [hiddenItems, setHiddenItems] = useState<Record<string, boolean>>({});
    const [selectedItem, setSelectedItem] = useState(null)
    const location = useLocation()
    // Function to toggle hidden state
    // const toggleHidden = (title: string) => {
    //   setHiddenItems(prev => ({
    //     ...prev,
    //     [title]: !prev[title]  // Toggle the current state
    //   }));
    // };
    const setQeuryAndReload = (title: string) => {
      const url = new URL(window.location.href);
      url.searchParams.set('section', title.split(' ')[0].toLowerCase());
    }
    
    const checkCVDirty = () => {
      return (isDirty(cvDirty.current.dirty))
    }
    
  return (
    <nav
      className={cn(
        "tw-flex tw-space-x-2 lg:tw-flex-col lg:tw-space-x-0 lg:tw-space-y-1",
        className
      )}
      {...props}
    >

      
      {items.map((item, key) => (
          
          <AlertDialog open={selectedItem === item.title} key={item.title}>
          <Button variant="ghost"  onClick={(e) => {
            if(checkCVDirty()) {
              setSelectedItem(item.title)
            }
            else{
              item.onClick(e)
            }
          }}>{item.title}</Button>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                You are about to discard your changes.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={(e) => {
                e.preventDefault()
                setSelectedItem('')
              }}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={async (e) => {
                setSelectedItem(null)
                resetCV()
                item.onClick(e)
              }}>Accept</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

     

      ))}

    </nav>
  )
}

{/* <button
            key={item.title}
            className={cn(
              buttonVariants({ variant: "ghost" }),
            )}
            onClick={(e) => {
              item.onClick(e)
            }}
          >
            {item.title}
          </button> */}