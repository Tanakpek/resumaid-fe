


import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";


export function TrialOrSubscribePlanCards({items, selected, setSelected} : {items: any[], selected: null | [number,string, string], setSelected: any}) {
    return (
        <BentoGrid className="tw-max-w-4xl tw-mx-auto md:tw-auto-rows-[20rem]">
            {items.map((item, i) => (
                <BentoGridItem 
                    key={i}
                    id={item.id}
                    product={item.product}
              
                    title={item.title}
                    description={item.description}
                    header={<Skeleton key={i} selected={i === selected?.[0]}/>}
                    className={item.className}
                    price={item.price}
                    billed={item.billed}
                    setter={() => {
                        setSelected((e) => [i, item.id, item.product])
                    }}
                />
            ))}
        </BentoGrid>
    );
}
const Skeleton = ({selected}) =>  (
    console.log(selected),
    <div className={`${selected ? "tw-border-fuchsia-700 tw-border-2" : "" } tw-flex tw-flex-1 tw-w-full tw-h-full tw-min-h-[6rem] tw-rounded-xl   dark:tw-bg-dot-white/[0.2] tw-bg-dot-black/[0.2] tw-[mask-image:radial-gradient(ellipse_at_center,white,transparent)] tw-border dark:tw-border-white/[0.2] tw-bg-neutral-100 dark:tw-bg-black tw-transition tw-duration-100`}></div>
);

