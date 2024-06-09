
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

import {  Popover } from '@/components/ui/popover'
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label"


import  CV  from "./user/cv/cv"

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function Profile() {
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cv_uploaded, setUploaded] = useState(true);
  const [cv_url, setUrl] = useState(null);
  const checkCVInterval = useRef(null)
  const auth = useAuth();
  const navigate = useNavigate();

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
      setLoading(false)
    }
    checkedCV.current += 1
    if(checkedCV.current > 10){
      clearInterval(checkCVInterval.current)
      console.log('CV not uploaded')
      setLoading(false)
    }
  }

  const uploadHandler = async (e:any) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;
    console.log(file)
    const file_type = encodeURIComponent(file.type)
    const resp = await fetch(cv_url, {
        method: 'PUT',
        body: file
      }
    );

    checkCVInterval.current = setInterval(checkCVHandler, 5000)
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true)
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(BACKEND_URL+'/users/profile', {
          method: 'GET',
          credentials: 'include'
        }
      );

      const data:User  = await response.json();
      setName(data.name);
      setLoading(false);
      setUploaded(data.cv_uploaded)
      let url = ''
      if(!data.cv_uploaded){
        const resp = await fetch(BACKEND_URL+'/users/cv_url', {
          method: 'POST',
          credentials: 'include'
        })
        console.log(resp)
        resp.json().then((data) => {
          url = data.upload_location
          setUrl(url)
        })
      }
      
      auth.login(data.name);
    }

    fetchData();
  }, []); // The empty array ensures this effect only runs once after the initial render

  
  if (loading) {
      return (<div><div>Loading...</div>
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
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="doc">Resume</Label>
              <Input id="cv" type="file" onChange={uploadHandler} />
            </div>}
            
          </div>
        </div>
      </main>
    </div>
  )
}