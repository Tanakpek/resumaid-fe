import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
// import { ModeToggle } from "./mode-toggle";
import { LogoIcon } from "./Icons";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#features",
    label: "Features",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
  {
    href: "#pricing",
    label: "Pricing",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="tw-sticky tw-border-b-[1px] tw-top-0 tw-z-40 tw-w-full tw-bg-white dark:tw-border-b-slate-700 dark:tw-bg-background">
      <NavigationMenu className="tw-mx-auto">
        <NavigationMenuList className="tw-container tw-h-14 tw-px-4 tw-w-screen tw-flex tw-justify-between ">
          <NavigationMenuItem className="ftw-ont-bold tw-flex">
            <a
              rel="noreferrer noopener"
              href="/"
              className="tw-ml-2 tw-font-bold tw-text-xl tw-flex"
            >
              <LogoIcon />
              ShadcnUI/React
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="tw-flex md:tw-hidden">
            {/* <ModeToggle /> */}

            <Sheet
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <SheetTrigger className="tw-px-2">
                <Menu
                  className="tw-flex md:tw-hidden tw-h-5 tw-w-5"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="tw-sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="tw-font-bold tw-text-xl">
                    Shadcn/React
                  </SheetTitle>
                </SheetHeader>
                <nav className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-2 tw-mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                  <a
                    rel="noreferrer noopener"
                    href="https://github.com/leoMirandaa/shadcn-landing-page.git"
                    target="_blank"
                    className={`tw-w-[110px] tw-border ${buttonVariants({
                      variant: "secondary",
                    })}`}
                  >
                    <GitHubLogoIcon className="tw-mr-2 tw-w-5 tw-h-5" />
                    Github
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="tw-hidden md:tw-flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`tw-text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          <div className="tw-hidden md:tw-flex tw-gap-2">
            <a
              rel="noreferrer noopener"
              href="https://github.com/leoMirandaa/shadcn-landing-page.git"
              target="_blank"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
            >
              <GitHubLogoIcon className="tw-mr-2 tw-w-5 tw-h-5" />
              Github
            </a>

            {/* <ModeToggle /> */}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
