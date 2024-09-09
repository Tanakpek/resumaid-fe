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

function App() {
  const { user, login, logout } = useAuth();
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
                <div><NavBar/> <Profile/></div>
            }>
            </Route>
        </Routes>
      
      <Toaster />
      
    </>
  )
}

export default App
