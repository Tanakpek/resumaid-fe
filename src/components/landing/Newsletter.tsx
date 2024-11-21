import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Newsletter = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Subscribed!");
  };

  return (
    <section id="newsletter" className="">
      <hr className="tw-w-11/12 tw-mx-auto" />

      <div className="tw-container tw-py-24 sm:tw-py-32">
        <h3 className="tw-text-center tw-text-4xl md:tw-text-5xl tw-font-bold">
          Join Our Daily{" "}
          <span className="tw-bg-[#D247BF] tw-text-transparent tw-bg-clip-text">
            Newsletter
          </span>
        </h3>
        <p className="tw-text-xl tw-text-muted-foreground tw-text-center tw-mt-4 tw-mb-8">
          Lorem ipsum dolor sit amet consectetur.
        </p>

        <form
          className="tw-flex tw-flex-col tw-w-full md:tw-flex-row md:tw-w-6/12 lg:tw-w-4/12 tw-mx-auto tw-gap-4 md:tw-gap-2"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="leomirandadev@gmail.com"
            className="tw-bg-muted/50 dark:tw-bg-muted/80 "
            aria-label="email"
          />
          <Button>Subscribe</Button>
        </form>
      </div>

      <hr className="tw-w-11/12 tw-mx-auto" />
    </section>
  );
};
