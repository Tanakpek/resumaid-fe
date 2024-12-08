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
import {registerLicense } from "@syncfusion/ej2-base"
import {Settings} from '@/src/components/user/settings/settings'
import { isDirty, useDirtyCV } from './components/user/cv/dirtyTracker'
import { dir } from 'console'

// registerLicense("Ngo9BigBOggjHTQxAR8/V1NDaF5cWGBCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWH9ccHRTQmlZUEN2XUo=")

function App() {
  const DirtyCv = useDirtyCV()
  const { user, login, logout } = useAuth();
  const [plan, setPlan] = useState(null)
  const [subStatus, setSubscriptionStatus] = useState(null)
  window.onbeforeunload = function() {
    if(isDirty(DirtyCv.current.dirty)){
      return "Changes you made to your background may not be saved.";
    }
  }
  
  return (
    <>
      
        <Routes>
            <Route path="/" element={
              <div>
                {/* <NavBar/>  */}
                <Home/>
              </div>
            }>
            </Route>

        <Route path="/settings" element={<><NavBar /><Settings /></>} />
            <Route path="/auth" element={
                <Dashboard/>
            }>
            </Route>

            <Route path="/profile" element={
                <div><NavBar/><Profile plan={plan} setSubStatus={setSubscriptionStatus} setPlan={setPlan} subStatus={subStatus}/></div>
            }>
            </Route>
            <Route path="/applications" element={
              <div><NavBar /><Applications plan={plan} subStatus={subStatus} setSubStatus={setSubscriptionStatus} setPlan={setPlan} /></div>
             }>
            </Route>
        </Routes>
      
      <Toaster />
      
    </>
  )
}

export default App
