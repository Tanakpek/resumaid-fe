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
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto ",
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
                "cursor-pointer row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4" ,
                className
            )}
        >
            {header} 
            <div className="group-hover/bento:translate-x-2 transition duration-200">
                <strong>$ </strong>{(price / (billed === '1y' ? 12 : billed === '1m' ? 1 : 6)).toPrecision(3)}/month  <span className="text-xs"> + usage</span>
                <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
                    {title} 
                </div>
                <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
                    {description}
                </div>
                {/* <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300 my-3">
                    Billed {billed}.
                </div> */}
            </div>
        </div>
    );
};
