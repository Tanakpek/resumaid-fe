import { Statistics } from "./Statistics";
import pilot from "@/src/assets/pilot.png";
import Boost from "@/src/assets/boost.svg?react";
export const About = () => {
  return (
    <section
      id="about"
      className="container py-24 sm:py-32 mx-auto"
    >
      <div className="bg-white border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <Boost className="w-[600px] object-contain rounded-lg"/>
          {/* <img
            src={pilot}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          /> */}
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <div className='flex justify-center'>
                <h2 className="text-3xl md:text-4xl font-bold mx-1 p-3">
                    About{" "}
                </h2>
                <div className="flex bg-primary-foreground rounded-md">
                  <span className="text-3xl md:text-4xl font-bold bg-primary text-transparent bg-clip-text mx-2 p-3">
                    Applicaid{" "}
                  </span>
                </div>
              </div>
              <p className="text-xl text-muted-foreground mt-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
