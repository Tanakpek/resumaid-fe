import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BackgroundGradient } from "@/components/ui/bg-gradient";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import { Check } from "lucide-react";

export enum PopularPlanType {
  NO = 0,
  YES = 1,
}

export interface PricingProps {
  title: string;
  popular: PopularPlanType;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
  disabled?: boolean;
}

const pricingList: PricingProps[] = [
  {
    title: "Standard",
    popular: 1,
    price: 4,
    description:
      "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
    buttonText: "Start Free Trial",
    benefitList: [
      "Pay as you go",
      "3 months document retention",
      "Basic application tracking",
      "Mix of fine-tuned GPT-4o and 3.5 Turbo",
    ],
  },
  {
    title: "Premium",
    popular: 0,
    price: 8,
    disabled: true,
    description:
      "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
    buttonText: "Coming soon",
    benefitList: [
      "More customization options",
      "Multiple resume presets",
      "Qucik Form Fill"
    ],
  },
  {
    title: "Professional",
    disabled: true,
    popular: 0,
    price: 20,
    description:
      "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
    buttonText: "Coming Soon",
    benefitList: [
      "Freedom to choose from models",
      "Backdoor to employers",
      "RAG augmented screening call suggestions",
      "Daily application kit"
    ],
  },
];

export const Pricing = () => {
  return (
    <section
      id="pricing"
      className="tw-container tw-py-24 sm:tw-py-32 tw-px-14"
    >
      <h2 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-center">
        Get
        Access
      </h2>
      <h3 className="tw-text-xl tw-text-center tw-text-muted-foreground tw-pt-4 tw-pb-8">
        Get started with standard. 
      </h3>
      <div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-8">
        {pricingList.map((pricing: PricingProps) => (
          
          <Card
            key={pricing.title}
            className={
              pricing.popular === PopularPlanType.YES
                ? "tw-drop-shadow-xl tw-shadow-black/10 dark:tw-shadow-white/10"
                : ""
            }
          >
            <CardHeader>
              <CardTitle className="tw-flex tw-item-center tw-justify-between">
                {pricing.title}
                {pricing.popular === PopularPlanType.YES ? (
                  <Badge
                    variant="secondary"
                    className="tw-text-sm tw-text-primary"
                  >
                    Most popular
                  </Badge>
                ) : null}
              </CardTitle>
              <div>
                <span className="tw-text-3xl tw-font-bold">${pricing.price}</span>
                <span className="tw-text-muted-foreground"> /month</span>
                <span className="tw-text-muted-foreground tw-font-thin"> + usage</span>
              </div>

              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button variant={pricing.disabled ? 'ghost' : 'default'} className={`tw-w-full`}>{pricing.buttonText}</Button>
            </CardContent>

            <hr className="tw-w-4/5 tw-m-auto tw-mb-4" />
          
            <CardFooter className="flex">
              <div className="tw-space-y-4">
                {pricing.benefitList.map((benefit: string) => (
                  <span
                    key={benefit}
                    className="tw-flex"
                  >
                    <Check className="tw-text-green-500" />{" "}
                    <h3 className="tw-ml-2">{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
          
        ))}
      </div>
    </section>
  );
};
