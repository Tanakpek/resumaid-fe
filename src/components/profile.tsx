
import { CircleUser, Cookie, Menu, Package2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import  dotenv  from 'dotenv'
import { BACKEND_URL } from "../utils/config"
import { User } from 'lib/types/user'
import { PersonalDetailsEdit } from "./user/cv/details"
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

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function Profile() {
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cv_uploaded, setUploaded] = useState(false);
  const [cv_url, setUrl] = useState(null);
  const checkCVInterval = useRef(null)
  const auth = useAuth();
  const navigate = useNavigate();
  const loadingLoopInterval = useRef(2000)

  const checkedCV = useRef(0)
  const checkCVHandler = async () => {
    const resp = await fetch(BACKEND_URL+'/users/cv', {
      method: 'GET',
      credentials: 'include'
    })
    const data = await resp.json()
    console.log(data)
    if(data){
      clearInterval(checkCVInterval.current)
      toast({
        variant: 'default',
        description: 'CV Parsed Successfully',
      })
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
    }
  }

  const uploadHandler = async (e:any) => {
    console.log(e)
    e.preventDefault();
    const file = e.target.files[0];
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

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(BACKEND_URL+'/users/profile', {
          method: 'GET',
          credentials: 'include'
        }
      );

      const data:User  = await response.json();
      setName(() => data.name);
      setLoading(() => false);
      setUploaded(() => data.cv_uploaded)
      let url = ''
      if(!data.cv_uploaded){
        const resp = await fetch(BACKEND_URL+'/users/cv_url', {
          method: 'POST',
          credentials: 'include'
        })
        resp.json().then((data) => {
          url = data.upload_location
          setUrl( () => url)
        })
      }
      auth.login(data.name);
    }

    fetchData();
  }, []); // The empty array ensures this effect only runs once after the initial render

  if (loading) {
      return (<div><div>Loading...</div>
      <MultiStepCVLoader></MultiStepCVLoader>
      <CV><div></div></CV>
      </div>);

  }
  return (
    
    <div className="flex min-h-screen w-full flex-col">
      
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">{name}</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
          >
            <a href="#" className="font-semibold text-primary">
              General
            </a>
            <a href="#">Security</a>
            <a href="#">Integrations</a>
            <a href="#">Support</a>
            <a href="#">Organizations</a>
            <a href="#">Advanced</a>
          </nav>
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Store Name</CardTitle>
                <CardDescription>
                  Used to identify your store in the marketplace.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <Input placeholder="Store Name" />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
            {!cv_uploaded && 
            <>
            <AlertDialog>
              <AlertDialogTrigger>Upload CV</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Please upload your CV</AlertDialogTitle>
                  <AlertDialogDescription>
                    Accepted: .pdf, .doc, .docx
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  
                  <Input title="Upload" className="bg-none hover:bg-primary-foreground-50 " id="cv" type="file" onChange={uploadHandler} />
            
               
                  
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            </>
            }
            
            
          </div>
        </div>
      </main>
    </div>
  )
}