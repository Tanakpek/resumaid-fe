
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
      
      <header className="text-primary dark:text-primary sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <a
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </a>
        <a
          href="/profile"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Profile
        </a>
        <a
          href="/applications"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Applications
        </a>
        
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <a
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Applicant
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Resumés
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Cover Letters
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground"
            >
              Jobs
            </a>
           
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
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
  