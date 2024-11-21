import { LogoIcon } from "./Icons";

export const Footer = () => {
  return (
    <footer id="footer" className="tw-bg-gradient-to-t tw-from-[#1c1c1c]  tw-via-[#232323] tw-to-[#151515] tw-py-2">
      <hr className="tw-w-11/12 tw-mx-auto tw-border-none" />

      <section className="tw-tw-container tw-py-20 tw-grid tw-grid-cols-2 md:tw-grid-cols-4 xl:tw-grid-cols-5 tw-gap-x-12 tw-gap-y-8">
        <div className="tw-col-span-full xl:tw-col-span-2 tw-text-gray-400">
          <a
            rel="noreferrer noopener"
            href="/"
            className="tw-font-bold tw-text-xl tw-flex"
          >
            <LogoIcon />
            ShadcnUI/React
          </a>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-2 tw-text-gray-400">
          <h3 className="tw-font-bold tw-text-lg">Follow US</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="tw-opacity-60 hover:tw-opacity-100"
            >
              Instagram
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="tw-opacity-60 hover:tw-opacity-100"
            >
              X
            </a>
          </div>

        </div>

       

        <div className="tw-flex tw-flex-col tw-gap-2 tw-text-gray-400">
          <h3 className="tw-font-bold tw-text-lg">About</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="tw-opacity-60 hover:tw-opacity-100"
            >
              Features
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="tw-opacity-60 hover:tw-opacity-100"
            >
              Pricing
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="tw-opacity-60 hover:tw-opacity-100"
            >
              FAQ
            </a>
          </div>
        </div>

        <div className="tw-flex tw-flex-col tw-gap-2  tw-text-gray-400">
          <h3 className="tw-font-bold tw-text-lg">Community</h3>
          

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="tw-opacity-60 hover:tw-opacity-100"
            >
              Discord
            </a>
          </div>

         
        </div>
      </section>

      
    </footer>
  );
};
