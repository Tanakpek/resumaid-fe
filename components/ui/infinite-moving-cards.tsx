"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: {
        quote: string;
        name: string;
        handle:string;
        picture: string;
    }[];
   
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
        addAnimation();
    }, []);
    const [start, setStart] = useState(false);
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                );
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };
    return (
        <div
            ref={containerRef}
            className={cn(
                "tw-scroller tw-relative tw-z-20  tw-max-w-7xl tw-overflow-hidden  tw-[mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    " tw-flex tw-min-w-full tw-shrink-0 tw-gap-4 tw-py-4 tw-w-max tw-flex-nowrap",
                    start && "tw-animate-scroll ",
                    pauseOnHover && "hover:tw-[animation-play-state:paused]"
                )}
            >
                {items.map((item, idx) => (
                    <li
                        className="tw-w-[350px] tw-max-w-full tw-relative tw-rounded-2xl tw-border tw-border-b-0 tw-flex-shrink-0 tw-border-slate-700 tw-px-8 tw-py-6 md:tw-w-[450px]"
                        style={{
                            background:
                                "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
                        }}
                        key={item.name}
                    >
                        
                        <blockquote>
                            <img src={item.picture} alt={item.name} className="-tw-top-0 tw-mb-2tw- w-16 tw-h-16 tw-rounded-full" />
                            <p className="tw-flex tw-mr-0 tw-mb-2 tw-text-sm  tw-text-gray-400 tw-font-normal !tw-text-left">
                                {item.handle}
                            </p>
                            <div
                                aria-hidden="true"
                                className="tw-user-select-none -tw-z-1 tw-pointer-events-none tw-absolute -tw-left-0.5 -tw-top-0.5 tw-h-[calc(100%_+_4px)] tw-w-[calc(100%_+_4px)]"
                            ></div>
                            <p className="tw-z-20 tw-text-sm tw-flex tw-mr-0 tw-text-gray-100 tw-font-normal tw-text-left">
                                {item.quote}
                            </p>
                            <div className="tw-relative tw-z-20 tw-mt-6 tw-flex tw-flex-row tw-items-center">
                            </div>
                        </blockquote>
                    </li>
                ))}
            </ul>
        </div>
    );
};