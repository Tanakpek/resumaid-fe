import { Radar } from "lucide-react";

interface SponsorProps {
  icon: JSX.Element;
  name: string;
}

const sponsors: SponsorProps[] = [
  {
    icon: <Radar size={34} />,
    name: "Sponsor 1",
  },
  {
    icon: <Radar size={34} />,
    name: "Sponsor 2",
  },
  {
    icon: <Radar size={34} />,
    name: "Sponsor 3",
  },
  {
    icon: <Radar size={34} />,
    name: "Sponsor 4",
  },
  {
    icon: <Radar size={34} />,
    name: "Sponsor 5",
  },
  {
    icon: <Radar size={34} />,
    name: "Sponsor 6",
  },
];

export const Sponsors = () => {
  return (
    <section
      id="sponsors"
      className="tw-container tw-pt-24 sm:tw-py-32"
    >
      <h2 className="tw-text-center tw-text-md lg:tw-text-xl tw-font-bold tw-mb-8 tw-text-primary">
        Investors and founders
      </h2>

      <div className="tw-flex tw-flex-wrap tw-justify-center tw-items-center tw-gap-4 md:tw-gap-8">
        {sponsors.map(({ icon, name }: SponsorProps) => (
          <div
            key={name}
            className="tw-flex tw-items-center tw-gap-1 tw-text-muted-foreground/60"
          >
            <span>{icon}</span>
            <h3 className="tw-text-xl  tw-font-bold">{name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
