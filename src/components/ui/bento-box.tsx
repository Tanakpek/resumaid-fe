


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
        <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
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
    <div className={`${selected ? "border-fuchsia-700 border-2" : "" } flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border dark:border-white/[0.2] bg-neutral-100 dark:bg-black transition duration-100`}></div>
);

