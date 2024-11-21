import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import image from "@/src/assets/growth.png";

import image4 from "@/src/assets/looking-ahead.png";

import image1 from "@/src/assets/social media and communication _ time, timed, timer, envelope, email, mail, message.svg";
import image2 from "@/src/assets/lifestyle and leisure _ man, meditation, relax, relaxation, male, boy, fitness, exercise.svg"
import image3 from "@/src/assets/tech and innovation _ future, tech, technology, robot, sort, document, paper, page, files.svg"
interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "Customized",
    description:
      "Stand out every time by customizing your cover letters and resumes for each job application.",
    image: image1,
  },
  {
    title: "Formatted",
    description:
      "Fit your experience and skills into a professional template vetted by HR professionals in top recruitment firms.",
    image: image3,
  },
  {
    title: "Seamless",
    description:
      "Use the Chrome extension to prepare all your documents with a single click of a button.",
    image: image2,
  },
];

const featureList: string[] = [
  "Dark/Light theme",
  "Reviews",
  "Features",
  "Pricing",
  "Contact form",
  "Our team",
  "Responsive design",
  "Newsletter",
  "Minimalist",
];

export const Features = () => {
  return (
    <section
      id="features"
      className="tw-container tw-py-24 sm:tw-py-32 tw-space-y-8 tw-p-14"
    >
      <h2 className="tw-text-3xl lg:tw-text-4xl tw-font-bold md:tw-text-center">
        Many{" "}
        <span className="tw-text-secondary-200 tw-bg-clip-text">
          Great Features
        </span>
      </h2>



      <div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <img
                src={image}
                alt="About feature"
                className="tw-w-[200px] lg:tw-w-[300px] tw-mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
