// "use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";
import cubeLeg from "@/src/assets/cube-leg.png";
// import React from "react";
// import { StickyScroll } from "@/components/ui/sticky-reveal.tsx";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Result Driven",
    description:
      "Realize interviews, offers, and hires in record time. We boast a 80% reduction in time-to-first-interview on our sample group.",
    icon: <ChartIcon />,
  },
  {
    title: "Affordable Pricing",
    description:
      "We make sure those GPUs are put to good use. Our pricing is 20% lower than the competition. You break even before lunch on your first day!",
    icon: <WalletIcon />,
  },
  {
    title: "Easy to Use",
    description:
      "Just press the button and watch the magic happen. Our platform is so easy to use, you'll be up and running in no time.",
    icon: <MagnifierIcon />,
  },
];

export const Services = () => {
  return (
    <section className="tw-container tw-py-24 sm:tw-py-32 tw-px-14">
      <div className="tw-grid lg:tw-grid-cols-[1fr,1fr] tw-gap-8 tw-place-items-center">
        <div>
          <h2 className="tw-text-3xl md:tw-text-4xl tw-font-bold">
            <span className="tw-bg-gradient-to-b tw-from-primary tw-to-primary tw-text-transparent tw-bg-clip-text">
              Client-Centric{" "}
            </span>
            Services
          </h2>

          <p className="tw-text-muted-foreground tw-text-xl tw-mt-4 tw-mb-8 ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
            dolor.
          </p>

          <div className="tw-flex tw-flex-col tw-gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="tw-space-y-1 tw-flex md:tw-flex-row tw-justify-start tw-items-start tw-gap-4">
                  <div className="tw-mt-1 tw-bg-primary/20 tw-p-1 tw-rounded-2xl">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="tw-text-md tw-mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <img
          src={cubeLeg}
          className="tw-w-[300px] md:tw-w-[500px] lg:tw-w-[600px] tw-object-contain"
          alt="About services"
        />
      </div>
    </section>
  );
};



"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="tw-h-[40rem] tw-rounded-md tw-flex tw-flex-col tw-antialiased tw-bg-white dark:tw-bg-black dark:tw-bg-grid-white/[0.05] tw-tems-center tw-justify-center tw-relative tw-overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    handle: "@john_Doe5",
    picture: 'https://github.com/shadcn.png'
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    handle: "@john_Doe5",
    picture: 'https://github.com/shadcn.png'
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    handle: "@john_Doe5",
    picture: 'https://github.com/shadcn.png'
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    handle: "@john_Doe5",
    picture: 'https://github.com/shadcn.png'
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    handle: "@john_Doe5",
    picture: 'https://github.com/shadcn.png'
  },
];