import { Statistics } from "./Statistics";
import pilot from "@/src/assets/pilot.png";
import Boost from "@/src/assets/boost.svg?react";
export const About = () => {
  return (
    <section
      id="about"
      className="tw-container tw-py-24 sm:tw-py-32 tw-mx-auto"
    >
      <div className="tw-bg-white tw-border tw-rounded-lg tw-py-12">
        <div className="tw-px-6 tw-flex tw-flex-col-reverse md:tw-flex-row tw-gap-8 md:tw-gap-12">
          <Boost className="tw-w-[600px] tw-object-contain tw-rounded-lg"/>
          {/* <img
            src={pilot}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          /> */}
          <div className="tw-bg-green-0 tw-flex tw-flex-col tw-justify-between">
            <div className="tw-pb-6">
              <div className='tw-flex tw-justify-center'>
                <h2 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-mx-1 tw-p-3">
                    About{" "}
                </h2>
                <div className="tw-flex tw-bg-primary-foreground tw-rounded-md">
                  <span className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-bg-primary tw-text-transparent tw-bg-clip-text tw-mx-2 tw-p-3">
                    Applicaid{" "}
                  </span>
                </div>
              </div>
              <p className="tw-text-xl tw-text-muted-foreground tw-mt-4">
                Companies use all sorts of tools to sift through resumes. You deserve more than a few nanoseconds of computer attention. Now
                its our machines vs. theirs. We are here to help you win.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
