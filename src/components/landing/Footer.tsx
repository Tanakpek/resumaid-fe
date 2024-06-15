import { LogoIcon } from "./Icons";

export const Footer = () => {
  return (
    <footer id="footer" className="bg-gradient-to-t from-[#1c1c1c]  via-[#232323] to-[#151515] py-2">
      <hr className="w-11/12 mx-auto border-none" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2 text-gray-400">
          <a
            rel="noreferrer noopener"
            href="/"
            className="font-bold text-xl flex"
          >
            <LogoIcon />
            ShadcnUI/React
          </a>
        </div>

        <div className="flex flex-col gap-2 text-gray-400">
          <h3 className="font-bold text-lg">Follow US</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Instagram
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              X
            </a>
          </div>

        </div>

       

        <div className="flex flex-col gap-2 text-gray-400">
          <h3 className="font-bold text-lg">About</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Features
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Pricing
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              FAQ
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2  text-gray-400">
          <h3 className="font-bold text-lg">Community</h3>
          

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Discord
            </a>
          </div>

         
        </div>
      </section>

      
    </footer>
  );
};
