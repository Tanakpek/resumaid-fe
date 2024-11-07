
import { CircleUser, Cookie, Menu, Package2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BACKEND_URL } from "../../utils/config"
import { User } from '@/lib/types/user'
import { fetchA, transformCV } from "../../utils/codes"
import { TransformedCV } from "@/src/utils/codes"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
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
import { Popover } from '@/components/ui/popover'
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dispatch, useEffect, useRef, useState } from "react"
import { useAuth } from "../auth";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label"

import CV from "../user/cv/cv"
import { MultiStepCVLoader } from "../ui/cv-loader"
import { ToastDemo } from "../ui/toast/submit"
import { toast } from "@/components/ui/use-toast"
import { set } from "date-fns"
import { Transform } from "stream"
import { MovingBorderDemo } from "../ui/upload-cv-button"
import { cvURL, getCV, getProfile, startScratchCV } from "../../utils/requests"
import { start } from "repl"
import { TrialOrContinue } from "../trial"

export const default_cv: TransformedCV = {
    details: {

    },
    education: [],
    work: [],
    projects: [],
    skills: [],
    professional_certifications: [],
    achievements_and_awards: [],
    volunteer: [],
    languages: []
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function Applications({ subStatus,  plan  }) {
    
    const auth = useAuth();
    const navigate = useNavigate();
    const [applications, setApplications] :  [any, Dispatch<any>] = useState(null)
    


    useEffect(() => {

    }, [applications]); // The empty array ensures this effect only runs once after the initial render

    return (

        <div className="flex min-h-screen w-full flex-col">
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <TrialOrContinue plan={plan} subscription_status={subStatus} />
            </main>
        </div>
    )
}