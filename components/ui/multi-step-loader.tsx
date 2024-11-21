"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

const CheckIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={cn("w-6 h-6 ", className)}
        >
            <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    );
};

const CheckFilled = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={cn("tw-w-6 tw-h-6 ", className)}
        >
            <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
            />
        </svg>
    );
};

type LoadingState = {
    text: string;
};

const LoaderCore = ({
    loadingStates,
    value = 0,
}: {
    loadingStates: LoadingState[];
    value?: number;
}) => {
    return (
        <div className="tw-flex tw-relative tw-justify-start tw-max-w-xl tw-mx-auto tw-flex-col tw-mt-40">
            {loadingStates.map((loadingState, index) => {
                const distance = Math.abs(index - value);
                const opacity = Math.max(1 - distance * 0.2, 0); // Minimum opacity is 0, keep it 0.2 if you're sane.

                return (
                    <motion.div
                        key={index}
                        className={cn("tw-text-left tw-flex tw-gap-2 tw-mb-4")}
                        initial={{ opacity: 0, y: -(value * 40) }}
                        animate={{ opacity: opacity, y: -(value * 40) }}
                        transition={{ duration: 0.5 }}
                    >
                        <div>
                            {index > value && (
                                <CheckIcon className="tw-text-black dark:tw-text-white" />
                            )}
                            {index <= value && (
                                <CheckFilled
                                    className={cn(
                                        "tw-text-black dark:tw-text-white",
                                        value === index &&
                                        "tw-text-black dark:tw-text-lime-500 tw-opacity-100"
                                    )}
                                />
                            )}
                        </div>
                        <span
                            className={cn(
                                "tw-text-black dark:tw-text-white",
                                value === index && "tw-text-black dark:tw-text-lime-500 tw-opacity-100"
                            )}
                        >
                            {loadingState.text}
                        </span>
                    </motion.div>
                );
            })}
        </div>
    );
};

export const MultiStepLoader = ({
    loadingStates,
    loading,
    duration = 2000,
    loop = true,

}: {
    loadingStates: LoadingState[];
    loading?: boolean;
    duration?: number;
    loop?: boolean;
}) => {
    const [currentState, setCurrentState] = useState(0);

    useEffect(() => {
        if (!loading) {
            setCurrentState(0);
            return;
        }
        const timeout = setTimeout(() => {
            setCurrentState((prevState) => 
                loop
                    ? prevState === loadingStates.length - 1
                        ? 0
                        : prevState + 1
                    : Math.min(prevState + 1, loadingStates.length - 1)
            );
        }, currentState === loadingStates.length - 2 ? duration * 8 :  1000 + Math.random() * 4500 );

        return () => clearTimeout(timeout);
    }, [currentState, loading, loop, loadingStates.length, duration]);
    return (
        <AnimatePresence mode="wait">
            {loading && (
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    exit={{
                        opacity: 0,
                    }}
                    className="tw-w-full tw-h-full tw-fixed tw-inset-0 tw-z-[100] tw-flex tw-items-center tw-justify-center tw-backdrop-blur-2xl"
                >
                    <div className="tw-h-96  tw-relative">
                        <LoaderCore value={currentState} loadingStates={loadingStates} />
                    </div>

                    <div className="tw-bg-gradient-to-t tw-inset-x-0 tw-z-20 tw-bottom-0 tw-bg-white dark:tw-bg-black tw-h-full tw-absolute tw-[mask-image:radial-gradient(900px_at_center,transparent_30%,white)]" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};