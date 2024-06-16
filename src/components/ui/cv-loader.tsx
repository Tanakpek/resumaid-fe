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
        text: "Adding pizzazz...",
    },
    {
        text: "Sending your CV to the cloud (literally)...",
    },
    {
        text: "Eating some low hanging fruit...",
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
        <div className="w-full h-[60vh] flex items-center justify-center">
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