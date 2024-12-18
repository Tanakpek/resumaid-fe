import { cn } from "@/lib/utils";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "tw-grid md:tw-auto-rows-[18rem] tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-5 tw-max-w-7xl tw-mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    id,
    product,
    className,
    title,
    description,
    header,
    icon,
    price,
    billed,
    setter,
}: {
    id: string
    product: string
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    price?: number;
    billed: '1m' | '6m' | '1y';
    setter: () => void;
}) => {
    return (

        <div onClick={() => {
            setter()
        } } 
            className={cn(
                "tw-cursor-pointer tw-row-span-1 tw-rounded-xl tw-group/bento hover:tw-shadow-xl tw-transition tw-duration-200 tw-shadow-input dark:tw-shadow-none tw-p-4 dark:tw-bg-black dark:tw-border-white/[0.2] tw-bg-white tw-border tw-border-transparent tw-justify-between tw-flex tw-flex-col tw-space-y-4" ,
                className
            )}
        >
            {header} 
            <div className="group-hover/bento:tw-translate-x-2 tw-transition tw-duration-200">
                <strong>$ </strong>{(price / (billed === '1y' ? 12 : billed === '1m' ? 1 : 6)).toPrecision(3)}/month  <span className="text-xs"> + usage</span>
                <div className="tw-font-sans tw-font-bold tw-text-neutral-600 dark:tw-text-neutral-200 tw-mb-2 tw-mt-2">
                    {title} 
                </div>
                <div className="tw-font-sans tw-font-normal tw-text-neutral-600 tw-text-xs dark:tw-text-neutral-300">
                    {description}
                </div>
                {/* <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 my-3">
                    Billed {billed}.
                </div> */}
            </div>
        </div>
    );
};
