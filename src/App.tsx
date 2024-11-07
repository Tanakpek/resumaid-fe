import { useEffect, useState } from 'react'
import { AuthProvider, useAuth } from './components/auth'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './views/home'
import React from 'react'
import { NavBar } from './components/navbar'
import { Toaster } from "@/components/ui/toaster"
import { Profile } from './components/profile'
import { Dashboard } from './components/login'
import { Applications } from './components/applications/applications'
import { getProfile } from './utils/requests'
import { User } from '@/lib/types/user'

function App() {
  const { user, login, logout } = useAuth();
  const [plan, setPlan] = useState(null)
  const [subStatus, setSubscriptionStatus] = useState(null)
  useEffect(() => {
    async function fetchData() {
      const window_loc = window.location.href
      const uri = new URL(window_loc)
      const revalidate = uri.searchParams.get('session_id')
      const response = await getProfile(revalidate ? revalidate : null)
      const data: User = await response.data
      const u = { name: data.name, email: data.email, plan: data.plan, billing_id: data.billing_id }
      login(u);
      setSubscriptionStatus(() => data.subscription_status || null)
      setPlan((e) => { data.plan || null })
    }
    fetchData();
  }, [plan, subStatus])
  return (
    <>
        <Routes>
            <Route path="/" element={
              <div>
                <NavBar/> 
                <Home/>
              </div>
            }>
            </Route>

            
            <Route path="/auth" element={
                <Dashboard/>
            }>
            </Route>

            <Route path="/profile" element={
                <div><NavBar/><Profile plan={plan} setSubStatus={setSubscriptionStatus} setPlan={setPlan} subStatus={subStatus}/></div>
            }>
            </Route>
            <Route path="/applications" element={
              <div><NavBar /><Applications plan={plan}  subStatus={subStatus} /></div>
            }>
            </Route>
        </Routes>
      
      <Toaster />
      
    </>
  )
}

export default App
