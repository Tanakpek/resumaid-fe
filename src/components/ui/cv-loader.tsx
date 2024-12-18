"use client";
import React, { MutableRefObject, useRef, useState } from "react";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";

const loadingStates = [
    {
        text: "Feeding your CV into our resume-o-matic...",
    },
    {
        text: "Giving your CV a motivational speech...",
    },
    {
        text: "Admiring coleagues' newborn baby photos...",
    },
    {
        text: "Sending your CV to the cloud (literally)...",
    },
    {
        text: "Circling back to the prior discussion...",
    },
    {
        text: "Asking plans for the weekend...",
    },
    {
        text: "Speaking to Karen from HR...",
    },
    {
        text: "Dodging the office gossip...",
    }
];

export function MultiStepCVLoader() {
    const [loading, setLoading] = useState(true);
    console.log('trying')

    
    return (
        <div className="tw-w-full tw-h-[60vh] tw-flex tw-items-center tw-justify-center">
            {/* Core Loader Modal */}
            <Loader loadingStates={loadingStates} loading={loading} duration={2000} loop={false} />

            {/* The buttons are for demo only, remove it in your actual code ⬇️ */}

            {/* {loading && (
                <button
                    className="fixed top-4 right-4 text-black dark:text-white z-[120]"
                    onClick={() => setLoading(false)}
                >
                    <IconSquareRoundedX className="h-10 w-10" />
                </button>
            )} */}
        </div>
    );
}