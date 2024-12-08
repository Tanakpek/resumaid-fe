import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check, Linkedin } from "lucide-react";
import { LightBulbIcon } from "./Icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { BackgroundGradient } from "@/components/ui/bg-gradient";

export const HeroCards = () => {
  return (
    <div className="tw-hidden lg:tw-flex tw-flex-row tw-flex-wrap tw-gap-3 tw-relative tw-w-[700px] tw-h-[500px] tw-ml-0">
      {/* Testimonial */}
      <Card className="tw-absolute tw-w--340px] -tw-top-[15px] tw-drop-shadow-xl tw-shadow-black/10 dark:tw-shadow-white/10">
        <CardHeader className="tw-flex tw-flex-row tw-items-center tw-gap-4 tw-pb-2">
          <Avatar>
            <AvatarImage
              alt=""
              src="https://github.com/shadcn.png"
            />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>

          <div className="tw-flex tw-flex-col">
            <CardTitle className="tw-text-lg">John Doe React</CardTitle>
            <CardDescription>@john_doe</CardDescription>
          </div>
        </CardHeader>

        <CardContent>This landing page is awesome!</CardContent>
      </Card>

      {/* Team */}
      <Card className="tw-absolute tw-right-[20px] tw-top-4 tw-w-80 tw-flex tw-flex-col tw-justify-center tw-items-center tw-drop-shadow-xl tw-shadow-black/10 dark:tw-shadow-white/10">
        <CardHeader className="tw-mt-8 tw-flex tw-justify-center tw-items-center tw-pb-2">
          <img
            src="https://i.pravatar.cc/150?img=58"
            alt="user avatar"
            className="tw-absolute tw-grayscale-[0%] -tw-top-12 tw-rounded-full tw-w-24 tw-h-24 tw-aspect-square tw-object-cover"
          />
          <CardTitle className="tw-text-center">Leo Miranda</CardTitle>
          <CardDescription className="tw-font-normal tw-text-primary">
            Frontend Developer
          </CardDescription>
        </CardHeader>

        <CardContent className="tw-text-center tw-pb-2">
          <p>
            I really enjoy transforming ideas into functional software that
            exceeds expectations
          </p>
        </CardContent>

        <CardFooter>
          <div>
            <a
              rel="noreferrer noopener"
              href="https://github.com/leoMirandaa"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="tw-sr-only">Github icon</span>
              <GitHubLogoIcon className="w-5 h-5" />
            </a>
            <a
              rel="noreferrer noopener"
              href="https://twitter.com/leo_mirand4"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="tw-sr-only">X icon</span>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="tw-fill-foreground tw-w-5 tw-h-5"
              >
                <title>X</title>
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>

            <a
              rel="noreferrer noopener"
              href="https://www.linkedin.com/"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="tw-sr-only">Linkedin icon</span>
              <Linkedin size="20" />
            </a>
          </div>
        </CardFooter>
      </Card>

      {/* Pricing */}
      
      <div className="tw-absolute tw-top-[185px] tw-left-[50px] tw-w-72  tw-drop-shadow-xl tw-shadow-black/10 dark:tw-shadow-white/10 tw-z-1">
        <BackgroundGradient className="tw-z-50 ">
          <div style={{ borderRadius: 21 }} className="tw-z-1 tw-bg-white dark:tw-bg-slate-900">
            <CardHeader className="tw-z-1">
              <CardTitle className="tw-flex tw-item-center tw-justify-between tw-z-1">
            Standard
            <Badge
              variant="secondary"
                  className="tw-text-sm tw-text-primary tw-z-1"
            >
              Most popular
            </Badge>
          </CardTitle>
          <div>
                <span className="tw-text-3xl tw-font-bold">$4</span>
                <span className="tw-text-muted-foreground"> /month</span>
                <span className="tw-text-muted-foreground tw-font-thin"> + usage</span>
          </div>

          <CardDescription>
            Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.
          </CardDescription>
        </CardHeader>

        <CardContent>
              <a  href='/auth' className={`tw-w-full ${buttonVariants({
                variant: "default",
                size: "default",
              }) }`}>Start Free Trial</a>
        </CardContent>

            <hr className="tw-w-4/5 tw-m-auto tw-mb-4" />

            <CardFooter className="tw-flex">
              <div className="tw-space-y-4">
            {["4 Team member", "4 GB Storage", "Upto 6 pages"].map(
              (benefit: string) => (
                <span
                  key={benefit}
                  className="tw-flex"
                >
                  <Check className="tw-text-green-500" />{" "}
                  <h3 className="tw-ml-2">{benefit}</h3>
                </span>
              )
            )}
          </div>
          
        </CardFooter>
          </div>
        </BackgroundGradient>
      </div>

      {/* Service */}
      <Card className="tw-absolute tw-w-[350px] -tw-right-[10px] tw-bottom-[35px]  tw-drop-shadow-xl tw-shadow-black/10 dark:tw-shadow-white/10">
        <CardHeader className="tw-space-y-1 tw-flex md:tw-flex-row tw-justify-start tw-items-start tw-gap-4">
          <div className="tw-mt-1 tw-bg-primary/20 tw-p-1 tw-rounded-2xl">
            <LightBulbIcon />
          </div>
          <div>
            <CardTitle>ATS Optimized</CardTitle>
            <CardDescription className="tw-text-md tw-mt-2">
              Our templates are optimized for Applicant Tracking Systems
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
