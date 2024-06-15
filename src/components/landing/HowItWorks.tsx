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
      className="container text-center py-24 sm:py-32 p-14"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="bg-primary text-transparent bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
        dolor pariatur sit!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <>
            
          <HoverEffect className="grid gap-4 place-items-center" items={[{title:title, description, link:'', icon: icon}]}>
          </HoverEffect>
            
          {/* <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card> */}
          
          </>
        ))}
      </div>
    </section>
  );
};
