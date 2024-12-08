import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import { google_oauth_url } from "../utils/config";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Google from '@/src/assets/google.svg?react'
import { BackgroundBeams } from "@/components/background-beams";

// export const Login = () => {
//     const [user, setUser] = useState("");
//     const auth = useAuth();
//     const navigate = useNavigate();

    
    
//     const handleLogin = () => {
//         auth.login(user);
//         navigate('/');
//     }

//     return (
//         <div>
//             <label>
//                 Username:{' '}
//                 <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
//             </label>
//             <button onClick={handleLogin}>Login</button>
//         </div>
//     )
    
// }


export function Dashboard() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const auth = useAuth();
    const navigate = useNavigate();
   

    // TODO doesn't work yet
    const handleLogin = (event) => {
        auth.login(user);
        navigate('/');
    }
  return (
    // tw-w-full
    <>
    <div className="tw-h-[900px]">
    <div className="tw-flex tw-justify-center tw-my-20 tw-relative tw-antialiased lg:tw-min-h-[600px] xl:tw-min-h-[800px] ">
    <div className="tw-bg-background  tw-rounded-lg  tw-w-4/5 tw-shadow-xl tw-border-gray-300 lg:tw-grid lg:tw-min-h-[600px] lg:tw-grid-cols-2 xl:tw-min-h-[800px] tw-overflow-hidden tw-z-10">
      <div className="tw-flex tw-items-center tw-justify-center tw-py-12">
        <div className="tw-mx-auto tw-grid tw-w-[350px] tw-gap-6">
          <div className="tw-grid tw-gap-2 tw-text-center">
            <h1 className="tw-text-3xl tw-font-bold">Login</h1>
            <p className="tw-text-balance tw-text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="tw-grid tw-gap-4">
            <div className="tw-grid tw-gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            <div className="tw-grid gap-2">
              <div className="tw-flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="/forgot-password"
                  className="tw-ml-auto tw-inline-block tw-text-sm tw-underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" onChange={(e) => setPass(e.target.value)} type="password" required/>
            </div>
            <Button type="submit" className=" tw-bg-primary hover:tw-bg-secondary tw-w-full tw-h-9" onClick={handleLogin}>
              Login
            </Button>
            
            
            <Button className=" tw-grid tw-grid-cols-3 tw-gap-4">
              <Google className=" tw-h-full tw-col-span-1"/>
              <a href={google_oauth_url} className=" tw-col-span-1 tw-flex tw-items-center tw-gap-2 tw-justify-center">Login with Google</a>
              </Button>
           
            
            
            
          </div>
          <div className="tw-mt-4 tw-text-center tw-text-sm">
            Don&apos;t have an account?{" "}
            <a href="#" className="tw-underline">
              Sign up
            </a>
          </div>
        </div>
        
      </div>
      <div className="tw-hidden tw-bg-muted lg:tw-block">
        <img
          src="/src/assets/dash.webp"
          alt="Image"
          className="tw-h-full tw-w-full tw-object-cover dark:tw-brightness-[0.2] dark:tw-grayscale"
        />

      </div>
      
    </div>
    
        
    </div>
    
      </div>
      <BackgroundBeams className="tw-h-[1000px] tw-p-20" />
    </>
  )
}
