import { Button } from "@/src/components/ui/moving-border";

export function MovingBorderDemo({children}) {
    return (
        <div>
            <Button
                borderRadius="0.6rem"
                className="tw-bg-white dark:tw-bg-slate-900 tw-text-black dark:tw-text-white tw-border-neutral-200 dark:tw-border-slate-800"
            >
                {children}
            </Button>
        </div>
    );
}