import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import { google_oauth_url } from "../utils/config";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const Login = () => {
    const [user, setUser] = useState("");
    const auth = useAuth();
    const navigate = useNavigate();

    
    
    const handleLogin = () => {
        auth.login(user);
        navigate('/');
    }

    return (
        <div>
            <label>
                Username:{' '}
                <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
            </label>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
    
}


export function Dashboard() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const auth = useAuth();
    const navigate = useNavigate();

    
    useEffect(() => {
        console.log(google_oauth_url)
    });
    const handleOauthLogin = async (token:any) => {
        const resp = await fetch(google_oauth_url, {
          method: 'GET',
          headers: {
            'Access-Control-Allow-Credentials': 'true',
          }
        })
        
    }
    const handleLogin = () => {
        auth.login(user);
        navigate('/');
    }
  return (
    <div className="rounded-lg w-full shadow-xl border-gray-300 lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] overflow-hidden">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" onChange={(e) => setPass(e.target.value)} type="password" required/>
            </div>
            <Button type="submit" className="w-full h-9 primary-foreground" onClick={handleLogin}>
              Login
            </Button>
            
            <div>
              <a href={google_oauth_url} className="flex items-center gap-2 justify-center">Login with google</a>
            </div>
            
            
            
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/src/assets/dash.webp"
          alt="Image"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
