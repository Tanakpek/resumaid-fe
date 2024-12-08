import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { HeroCards } from "./HeroCards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const Hero = () => {
  return (
    <section className="tw-container tw-grid lg:tw-grid-cols-2 tw-place-items-center tw-py-20 md:tw-py-32 tw-gap-1 tw-mx-auto p-14">
      <div className="tw-text-center lg:tw-text-start tw-space-y-6">
        <main className="tw-text-5xl md:tw-text-6xl tw-font-bold">
          <h1 className="tw-inline">
            <span className="tw-inline tw-bg-gradient-to-r tw-from-primary  tw-to-[#D247BF] tw-text-transparent tw-bg-clip-text">
                Ultimate
            </span>{" "}
            tool
          </h1>{" "}
          for{" "}
          <h2 className="">
            Job{" "}
            <span className="tw-inline tw-bg-gradient-to-r tw-from-black tw-via-secondary-200 tw-to-secondary tw-text-transparent tw-bg-clip-text">
              Applicants
            </span>{" "}
              Worldwide
          </h2>
        </main>

        <p className="tw-text-xl tw-text-muted-foreground md:tw-w-10/12 tw-mx-auto lg:tw-mx-0">
          Showcase your best effortlessly. Our AI crafts applications that get you noticed.
        </p>

        <div className="tw-space-y-4 md:tw-space-y-0 md:tw-space-x-4">
          <a href='/auth'className={` w-full md:w-1/3 ${buttonVariants({
            variant: "default",
          })}`}>Get Started</a>

          {/* <a
            rel="noreferrer noopener"
            href="https://github.com/leoMirandaa/shadcn-landing-page.git"
            target="_blank"
            className={`tw-w-full md:tw-w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Github Repository
            <GitHubLogoIcon className="tw-ml-2 tw-w-5 tw-h-5" />
          </a> */}
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="tw-z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="tw-shadow"></div>
    </section>
  );
};
