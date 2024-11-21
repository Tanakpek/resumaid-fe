import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "./Icons";
import { HoverEffect } from "@/components/ui/hover-card";
interface FeatureProps {
  icon: 0 | 1 | 2 | 3;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: 0,
    title: "Aggregate",
    description:
      "Upload your resume and let our AI populate your profile with your skills and experiences.",
  },
  {
    icon: 1,
    title: "Edit",
    description:
      "Add or remove skills, experiences, and projects to your profile making them available for use in future applications.",
  },
  {
    icon: 2,
    title: "Apply",
    description:
      "Generate a resume or cover letter with a single click and apply for jobs with ease using the browser extension.",
  },
  {
    icon: 3,
    title: "Track",
    description:
      "Make sure to skim that cover letter when you get the interview",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="tw-container tw-text-center tw-py-24 sm:tw-py-32 tw-p-14"
    >
      <h2 className="tw-text-3xl md:tw-text-4xl tw-font-bold ">
        How It{" "}
        <span className="tw-bg-primary tw-text-transparent tw-bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="md:tw-w-3/4 tw-mx-auto tw-mt-4 tw-mb-8 tw-text-xl tw-text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
        dolor pariatur sit!
      </p>

      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <>
            
            <HoverEffect className="tw-grid tw-gap-4 tw-place-items-center" items={[{title:title, description, link:'', icon: icon}]}>
            
            
          {/* <Card
            key={title}
            className="tw-bg-muted/50"
          >
            <CardHeader>
                <CardTitle className="tw-grid tw-gap-4 tw-place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card> */}
            </HoverEffect>
          
          
          </>
        ))}
      </div>
    </section>
  );
};
