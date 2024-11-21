import { Button } from "@/components/ui/button";

export const Cta = () => {
  return (
    <section
      id="cta"
      className="tw-bg-muted/50 tw-py-16 tw-my-24 sm:tw-my-32 tw-p-14"
    >
      <div className="tw-container lg:tw-grid lg:tw-grid-cols-2 tw-place-items-center">
        <div className="lg:tw-col-start-1">
          <h2 className="tw-text-3xl md:tw-text-4xl tw-font-bold ">
            All Your
            <span className="tw-bg-secondary-200 tw-text-transparent tw-bg-clip-text">
              {" "}
              Ideas & Concepts{" "}
            </span>
            In One Interface
          </h2>
          <p className="tw-text-muted-foreground tw-text-xl tw-mt-4 tw-mb-8 tw-lg:mb-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
            beatae. Ipsa tempore ipsum iste quibusdam illum ducimus eos. Quasi,
            sed!
          </p>
        </div>

        <div className="tw-space-y-4 lg:tw-col-start-2">
          <Button className="tw-w-full md:tw-mr-4 md:tw-w-auto">Request a Demo</Button>
          <Button
            variant="outline"
            className="tw-w-full md:tw-w-auto"
          >
            View all features
          </Button>
        </div>
      </div>
    </section>
  );
};
