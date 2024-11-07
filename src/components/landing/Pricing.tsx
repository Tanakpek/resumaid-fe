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
    price: 12,
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
    price: 20,
    disabled: true,
    description:
      "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
    buttonText: "Coming soon",
    benefitList: [
      "More customization options",
      "Tag takeaways for resume presets",
      "Freedom to choose from models",
    ],
  },
  {
    title: "Enterprise",
    disabled: true,
    popular: 0,
    price: 40,
    description:
      "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
    buttonText: "Coming Soon",
    benefitList: [
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
      className="container py-24 sm:py-32 px-14"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Get
        Access
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        Get started with standard. 
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingList.map((pricing: PricingProps) => (
          
          <Card
            key={pricing.title}
            className={
              pricing.popular === PopularPlanType.YES
                ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                : ""
            }
          >
            <CardHeader>
              <CardTitle className="flex item-center justify-between">
                {pricing.title}
                {pricing.popular === PopularPlanType.YES ? (
                  <Badge
                    variant="secondary"
                    className="text-sm text-primary"
                  >
                    Most popular
                  </Badge>
                ) : null}
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">${pricing.price}</span>
                <span className="text-muted-foreground"> /month</span>
              </div>

              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button variant={pricing.disabled ? 'ghost' : 'default'} className={`w-full`}>{pricing.buttonText}</Button>
            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />
          
            <CardFooter className="flex">
              <div className="space-y-4">
                {pricing.benefitList.map((benefit: string) => (
                  <span
                    key={benefit}
                    className="flex"
                  >
                    <Check className="text-green-500" />{" "}
                    <h3 className="ml-2">{benefit}</h3>
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
