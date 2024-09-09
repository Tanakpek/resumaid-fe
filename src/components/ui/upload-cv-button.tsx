import { Button } from "@/src/components/ui/moving-border";

export function MovingBorderDemo({children}) {
    return (
        <div>
            <Button
                borderRadius="0.6rem"
                className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
                {children}
            </Button>
        </div>
    );
}