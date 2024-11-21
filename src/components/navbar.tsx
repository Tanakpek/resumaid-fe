
import { useState } from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "./ui/navigation-menu"
import { useAuth } from "./auth";
import { Sheet } from "@/components/ui/sheet";
import { SheetTrigger } from "@/components/ui/sheet";
import { Button} from "@/components/ui/button"
import { Package2 } from "lucide-react";
import { Menu } from "lucide-react";
import { SheetContent} from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Search } from "lucide-react";
import { CircleUser } from "lucide-react";
import { useNavigate } from "react-router-dom";

  export const NavBar = () => {
    
    const auth = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
      auth.logout()
      navigate('/auth')
    }
    return (
      
      <header className="tw-text-primary dark:tw-text-primary tw-sticky tw-top-0 tw-flex tw-h-16 tw-items-center tw-gap-4 tw-border-b tw-bg-background tw-px-4 md:tw-px-6">
        <nav className="tw-hidden tw-flex-col tw-gap-6 tw-text-lg tw-font-medium md:tw-flex md:tw-flex-row md:tw-items-center md:tw-gap-5 md:tw-text-sm lg:tw-gap-6">
        <a
          href="#"
            className="tw-flex tw-items-center tw-gap-2 tw-text-lg tw-font-semibold md:tw-text-base"
        >
          <Package2 className="h-6 w-6" />
            <span className="tw-sr-only">Acme Inc</span>
        </a>
        <a
          href="/profile"
            className="tw-text-muted-foreground tw-transition-colors hover:tw-text-foreground"
        >
          Profile
        </a>
        <a
          href="/applications"
            className="tw-text-muted-foreground tw-transition-colors hover:tw-text-foreground"
        >
          Applications
        </a>
        
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
              className="tw-shrink-0 md:tw-hidden"
          >
              <Menu className="tw-h-5 tw-w-5" />
              <span className="tw-sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
            <nav className="tw-grid tw-gap-6 tw-text-lg tw-font-medium">
            <a
              href="#"
                className="tw-flex tw-items-center tw-gap-2 tw-text-lg tw-font-semibold"
            >
                <Package2 className="tw-h-6 tw-w-6" />
                <span className="tw-sr-only">Acme Inc</span>
            </a>
            <a
              href="#"
                className="tw-text-muted-foreground hover:tw-text-foreground"
            >
              Applicant
            </a>
            <a
              href="#"
                className="tw-text-muted-foreground hover:tw-text-foreground"
            >
              Resumés
            </a>
            <a
              href="#"
                className="tw-text-muted-foreground hover:tw-text-foreground"
            >
              Cover Letters
            </a>
            <a
              href="#"
                className="tw-text-muted-foreground hover:tw-text-foreground"
            >
              Jobs
            </a>
           
          </nav>
        </SheetContent>
      </Sheet>
        <div className="tw-flex tw-w-full tw-items-center tw-gap-4 md:tw-ml-auto md:tw-gap-2 lg:tw-gap-4">
          <form className="tw-ml-auto tw-flex-1 sm:tw-flex-initial">
          
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="tw-rounded-full">
                <CircleUser className="tw-h-5 tw-w-5" />
                <span className="tw-sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            { auth.user && <DropdownMenuLabel>My Account</DropdownMenuLabel>}
            { auth.user && <DropdownMenuSeparator />}
            { auth.user && <a href='/profile'><DropdownMenuItem>Settings</DropdownMenuItem></a>}
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            { auth.user &&<DropdownMenuItem ><Button onClick={handleLogout}>Logout</Button></DropdownMenuItem>  }
            { !auth.user && <a href='/auth'><DropdownMenuItem >Login </DropdownMenuItem></a>}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
    )
  }
  