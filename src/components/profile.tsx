
import { CircleUser, Cookie, Menu, Package2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BACKEND_URL } from "../utils/config"
import { User } from '@/lib/types/user'
import { fetchA, transformCV } from "../utils/codes"
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
import {  Popover } from '@/components/ui/popover'
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label"

import  CV  from "./user/cv/cv"
import { MultiStepCVLoader } from "./ui/cv-loader"
import { ToastDemo } from "./ui/toast/submit"
import { toast } from "@/components/ui/use-toast"
import { set } from "date-fns"
import { Transform } from "stream"
import { MovingBorderDemo } from "./ui/upload-cv-button"
import { cvURL, getCV, getProfile, startScratchCV } from "../utils/requests"
import { start } from "repl"
import { TrialOrContinue } from "./trial"

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

export function Profile({subStatus, setSubStatus, plan, setPlan}) {
  // const [name, setName] = useState(null);
  // const [cv_uploaded, setUploaded] = useState(false);
  
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(false);
  const [cv_url, setUrl] = useState(null);
  const [cv, setCV] = useState(null)
  const checkCVInterval = useRef(null)
  const auth = useAuth();


  const navigate = useNavigate();
  const checkedCV = useRef(0)
  const checkCVHandler = async () => {
    const resp = await getCV()
    const data = await resp.data
    
    if(data){
      clearInterval(checkCVInterval.current)
      toast({
        variant: 'default',
        description: 'CV Parsed Successfully',
      })
      setCV(() => transformCV(data))
      setLoading(false)
    }
    checkedCV.current += 1
    if(checkedCV.current > 15){
      clearInterval(checkCVInterval.current)
      console.log('CV not uploaded')
      toast({
        variant: 'destructive',
        title: "Error Parsing CV",
        description: 'An error occured while parsing your CV.Please try again.',
      })
      setLoading(false)
      checkedCV.current = 0
    }
  }
  

  const defaultCVHandler = async () => {
    const cv = await startScratchCV()
    if(cv.status === 200){
      const data = await cv.data
      setCV(transformCV(data))
    }
  }
  
  const uploadHandler = async (e:any) => {
    e.preventDefault();
    const t = e.target as HTMLElement;
    const input = t.parentElement.querySelector('input') as HTMLInputElement;
    const file = input.files[0];
    if (!file) return;
    const file_type = encodeURIComponent(file.type)
    const resp = await fetch(cv_url, {
        method: 'PUT',
        body: file
      }
    );
    checkCVInterval.current = setInterval(checkCVHandler, 5000)
    const formData = new FormData();
    formData.append('file', file);
    setLoading(() => true)
  }
  async function fetchData() {
    const window_loc = window.location.href
    const uri = new URL(window_loc)
    const revalidate = uri.searchParams.get('session_id')
    const response = await getProfile(revalidate ? revalidate : null)
    const data: User = await response.data
    setDetails(() => data.details);
    setLoading(false);
    let url = ''
    if (!data.cv_uploaded) {
      const resp = await cvURL()
      url = resp.data.upload_location
      setUrl(() => url)
    }
    else {
      const resp = await getCV()
      const cv = await resp.data
      // need to set details and cv separately
      const transformed_cv = transformCV(cv)
      setCV(transformCV(transformed_cv))
    }
    const u = { name: data.name, email: data.email, plan: data.plan, billing_id: data.billing_id }
    // TODO separate user app data and auth data in the context
    /* Profile component should only be concerned with user data
       and should not be concerned with auth data
       the auth data gets loaded on the top level component
     */
    
    auth.login({ ...u, subscription_status: data.subscription_status });
    setSubStatus(() => data.subscription_status || null)
    setPlan((e) => { data.plan || null })
  }

  useEffect(() => {
    fetchData();
  }, [plan, subStatus]); // The empty array ensures this effect only runs once after the initial render

  if (loading) {
      return (<div><div>Loading...</div>
      <MultiStepCVLoader></MultiStepCVLoader>
    
      </div>);
  }
  return (

    <>
      
      <main className="tw-flex tw-min-h-[calc(100vh_-_theme(spacing.16))] tw-flex-1 tw-flex-col tw-gap-4 tw-bg-muted/40 tw-p-4 md:tw-gap-8 md:tw-p-10 main-back">
        
        <TrialOrContinue plan={plan} subscription_status={subStatus}/>
        {  cv && <CV data={cv} details={details} fetchData={fetchData}><div></div></CV>}
        {  !cv && 
          <div className="tw-m-auto">
        <div className="tw-mx-auto tw-grid tw-w-full tw-max-w-6xl tw-gap-2">
          <h1 className="tw-text-3xl tw-font-semibold">{details?.name}</h1>
        </div>
        
        <div className="tw-flex tw-justify-center">
          <div>
            <div className="tw-my-6">
              <AlertDialog>
                // todo fix bug here, button inside button
                <MovingBorderDemo>
                      <AlertDialogTrigger><p className="tw-text-base tw-font-semibold">Upload CV</p></AlertDialogTrigger>
                </MovingBorderDemo>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Please upload your CV</AlertDialogTitle>
                    <AlertDialogDescription>
                      Accepted: .pdf, .doc, .docx
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Input title="Upload" className="tw-bg-none hover:tw-bg-primary-foreground-50 " id="cv" type="file"  />
                    <Button variant="ghost" onClick={uploadHandler}>Upload</Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            <p className=" tw-text-s tw-font-light">or</p>
            <Button variant='ghost' className="tw-my-4" onClick={defaultCVHandler}>
                  <p className=" tw-text-base">Start from Scratch</p>
            </Button>
            
          </div>
          </div> 
          </div>
        }
      </main>

    </>
  )
}