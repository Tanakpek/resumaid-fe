import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { TrialOrSubscribePlanCards } from "./ui/bento-box"
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { IconClipboardCopy, IconFileBroken, IconSignature } from "@tabler/icons-react";
import { Separator } from "@radix-ui/react-separator";
import { loadStripe, Stripe } from '@stripe/stripe-js';
// Your Stripe public API key
import { BACKEND_URL } from "../utils/config";
import { createCheckoutSession, getBillingConfig, getBillingId, getSubscriptionPrices } from "../utils/requests";
import { useEffect, useState } from "react";
import { set } from "date-fns";
import { toast } from "@/components/ui/use-toast";

const  benefit_list  = [
    "3 months document retention.",
    "Generate both resumes and cover letters.",
    "Basic application tracking.",
    "Mix of fine-tuned GPT-4o and 3.5 Turbo."
]

type Pricing = {
    id: string,
    active: boolean,
    trial_description: string,
    product: string,
    type: 'recurring' | 'one_time' | 'metered',
    unit_price_cents: number,
    billing_interval: '1m' | '6m' | '1y'
}

const billingHeaderMap = {
    '1m': '1 Month',
    '6m': '6 Months',
    '1y': '1 Year'
}

export const TrialOrContinue = ({plan, subscription_status}) => {
    const auth = useAuth();
    const [pricing, setPricing] = useState(null)
    const [selected , setSelected] = useState(null);


    const navigate = useNavigate();
    const createSubscription = async () => {
        if(!selected){
            toast({
                variant: 'default',
                description: 'Please select a plan to continue',
            })
        }
        const resp = await createCheckoutSession(selected[1])
        const {sessionId} = await resp.data

        
        const stripe = await (window as any).stripe as Stripe;
        const { error } = await stripe.redirectToCheckout({
            sessionId: sessionId
        });
        if(error){
            console.log(error)
            navigate('.')
        }
    }

    useEffect(() => {

        console.log(subscription_status)
        console.log(subscription_status !== 'trial' && subscription_status !== 'active')
         getSubscriptionPrices().then((resp) => {
            const prices:Pricing[] = resp.data
            prices.sort((a, b) => a.unit_price_cents - b.unit_price_cents)
            const prices_formatted = prices.map((p) => {
                return {
                    id: p.id,
                    title: billingHeaderMap[p.billing_interval],
                    description: p.trial_description,
                    product: p.product,
                    header: <Skeleton />,
                    className: "md:col-span-1",
                    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
                    price: p.unit_price_cents / 100,
                    billed: p.billing_interval,
                }
            })
            setPricing((p) => prices_formatted)
         })
    }, [plan, subscription_status])

    const handleLogout = () => {
        auth.logout()
        navigate('/auth')
    }

    return (<>
        {! auth?.user?.plan &&
        <AlertDialog defaultOpen={!(auth?.user?.plan || false) || (subscription_status !== 'trial' && subscription_status !== 'active')}>
            <AlertDialogContent className="tw-max-w-4xl">
            <div className="tw-flex tw-justify-end">
                <Button className=" tw-right-0"variant={"link"} onClick={handleLogout}>Logout</Button>
            </div>
                {pricing && <TrialOrSubscribePlanCards items={pricing} selected={selected} setSelected={setSelected}/>}
                <div className="mx-3">
                    {benefit_list.map((benefit: string) => (
                        <span
                            key={benefit}
                            className="flex"
                        >
                            <Check className="tw-text-green-500" />{" "}
                            <h3 className="ml-2">{benefit}</h3>
                        </span>
                    ))}
                </div> 
            <AlertDialogFooter className="tw-justify-around">
                    
                    <AlertDialogAction asChild>
                        <Button onClick={async () => {
                            if(auth.user){
                                await createSubscription()
                            }else{
                                navigate('/auth')
                            }
                            
                        }} variant="outline">
                            Start Trial
                        </Button>
                    </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        
    </AlertDialog>
        }
    </>
    )

}


const Skeleton = ({ selected = null }) => (
    <div className={`${selected ? "border-fuchsia-500 border-2" : ""} flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black transition duration-100`}></div>
);
const items = [
    {
        title: "1 Month",
        description: "In and out, quick and easy.",
        header: <Skeleton />,
        className: "md:col-span-1",
        icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
        price: 3.49,
        billed: '1m' as '1m'

    },
    {
        title: "6 Months",
        description: "Ideal time to explore your opportunities.",
        header: <Skeleton />,
        className: "md:col-span-1",
        icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
        price: 12,
        billed: '6m' as '6m'

    },
    {
        title: "1 Year",
        description: "Best value for your money.",
        header: <Skeleton />,
        className: "md:col-span-1",
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
        price: 20,
        billed: '1y' as '1y'
    }

];